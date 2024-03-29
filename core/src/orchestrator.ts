import { generateToken, getOidcIssuer } from './solid-helper.js';

import {
    setUserToken,
    listUsers,
    getUserInfo,
} from "./database.js";
export {
    deleteUser,
    userInfoState,
    setCalendarSourceUrl as updateCalendarUrl
} from "./database.js";

import { updateAvailability } from './update-availability.js';
export { updateAvailability } from './update-availability.js';


export async function registerUser(email: string, password: string, webid: string, issuer?: string) {
    issuer = await getOidcIssuer(webid, issuer);

    const { id, secret } = await generateToken(email, password, issuer);

    if (id === undefined || secret === undefined) {
        return null;
    }
    console.log("Obtained CSS access id and token");

    const result = await setUserToken(webid, issuer, id, secret);
    console.log(result);

    return result;
}

export async function updateCalendarAll(collectErrors?: boolean): Promise<Error[]> {
    const users = await listUsers();
    const errors = [] as Error[];
    users.map(async (user) => {
        const webid = user.webid;
        const info = await getUserInfo(webid);
        console.log("Updating", webid);
        if (info) {
            try {
                await updateAvailability(webid, info.issuer);
                console.log("Done", webid);
            } catch (e) {
                if (collectErrors) {
                    errors.push(e);
                }
                console.error("Error updating for %s: %s", webid, (e as Error).message);
            }
        } else {
            console.error(`No user info for ${webid}. Skipping`);
        }
    });
    return errors;
}
