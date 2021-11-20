import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { isAuthenticated, popupOpen, user } from './store';
import config from './auth_config';

async function createClient(): Promise<Auth0Client> {
    return await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    });
}

async function loginWithPopup(client: Auth0Client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);
        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;