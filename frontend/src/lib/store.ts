import type { Auth0Client } from '@auth0/auth0-spa-js';
import { get, writable } from 'svelte/store';

export interface User {
    email: string;
}

export async function updateAuthState() {
    let auth = get(auth0Client)
    if (auth !==null) {
        isAuthenticated.set(await auth.isAuthenticated())
    } else if (get(isAuthenticated)) {
        isAuthenticated.set(false)
    }
}

export const auth0Client = writable<Auth0Client>(null)
export const isAuthenticated = writable(false);
auth0Client.subscribe((_)=>{updateAuthState()})

export const auth0User = writable<User>(null);
isAuthenticated.subscribe(async (isAuthenticated)=>{
    if (isAuthenticated) {
        auth0User.set(await get(auth0Client).getUser())
    }
})
export const auth0Ready = writable(false);
export const auth0PopupOpen = writable(false);