import { writable } from 'svelte/store';

export interface User {
    email: string;
}

export const isAuthenticated = writable(false);
export const user = writable<User>({ email: '', });
export const isLoading = writable(true);
export const popupOpen = writable(false);
export const error = writable();