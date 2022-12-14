function callApi(endpoint, method, data) {
    console.log(data);
    return new Promise(
        (resolve, reject) => {
            fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    resolve(response.body);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    );
}

export async function generateToken(orchestrator_url, email, password, webid, issuer) {
    const data = {
        webid: webid,
        issuer: issuer,
        email: email,
        password: password,
    };
    return callApi(`${orchestrator_url}/user`, 'POST', data);
}

export async function revokeAccess(orchestrator_url, webid) {
    const data = {
        webid: webid,
    };
    return callApi(`${orchestrator_url}/user`, 'DELETE', data);
}

export async function updateAvailability(orchestrator_url, webid, issuer) {
    const data = {
        webid: webid,
        issuer: issuer,
    }
    return callApi(`${orchestrator_url}/user`, 'POST', data);
}

export async function updateIcs(orchestrator_url, ics, webid) {
    const data = {
        webid: webid,
        cal_url: ics,
    }
    return callApi(`${orchestrator_url}/user`, 'POST', data);
}

export async function userInfoState(orchestrator_url, webid) {
    const data = {
        webid: webid,
    }
    return callApi(`${orchestrator_url}/user`, 'GET', data);
}
