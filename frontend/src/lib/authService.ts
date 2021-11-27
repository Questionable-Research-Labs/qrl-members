import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { auth0Client, auth0Ready, isAuthenticated, auth0PopupOpen, auth0User, updateAuthState } from './store';
import config from './authConfig';
import { get } from 'svelte/store';

export async function createClient() {
    auth0Ready.set(false);
    auth0Client.set(await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    }));
    auth0Ready.set(true);
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

export function logout() {
    let client = get(auth0Client)
    return client.logout();
}