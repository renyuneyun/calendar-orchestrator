import {
  createDpopHeader,
  generateDpopKeyPair,
  buildAuthenticatedFetch,
} from "@inrupt/solid-client-authn-core";


export async function generateToken(email: string, password: string, issuer: string) {
  const token_response = await fetch(issuer + "idp/credentials/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    // The email/password fields are those of your account.
    // The name field will be used when generating the ID of your token.
    body: JSON.stringify({
      email: email,
      password: password,
      name: "my-token",
    }),
  });

  const { id, secret } = await token_response.json() as {
    id?: string,
    secret?: string,
  };

  return { id, secret };
}

export async function getAuthFetch(id: string, secret: string, issuer: string) {
  const dpopKey = await generateDpopKeyPair();
  // Both the ID and the secret need to be form-encoded.
  const authString = `${encodeURIComponent(id)}:${encodeURIComponent(secret)}`;
  const tokenUrl = issuer + ".oidc/token";
  const access_token_response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      // The header needs to be in base64 encoding.
      authorization: `Basic ${Buffer.from(authString).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
      dpop: await createDpopHeader(tokenUrl, "POST", dpopKey),
    },
    body: "grant_type=client_credentials&scope=webid",
  });

  const { access_token: accessToken } = await access_token_response.json();
  const authFetch = await buildAuthenticatedFetch(fetch, accessToken, {
    dpopKey,
  });
  return authFetch;
};
