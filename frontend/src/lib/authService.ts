import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { auth0Client, auth0Ready, auth0PopupOpen, updateAuthState } from './store';
import config from './authConfig';
import { get } from 'svelte/store';

export async function createClient() {
    console.log("Creating Auth0 Client")
    auth0Ready.set(false);
    auth0Client.set(await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    }));
    auth0Ready.set(true);
    console.log("Finished Creating Auth0 Client")
}

export async function loginWithPopup(options) {
    let client = get(auth0Client)
    auth0PopupOpen.set(true);
    try {
        await client.loginWithPopup(options);
        await updateAuthState()
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        auth0PopupOpen.set(false);
    }
}

export async function logout() {
    let client = get(auth0Client)
    await client.logout();
}