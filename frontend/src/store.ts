import { derived, writable } from 'svelte/store';

export interface User {
    email: string;
}

export const isAuthenticated = writable(false);
export const user = writable<User>({
    email: '',
});
export const popupOpen = writable(false);
export const error = writable();

export const tasks = writable([]);

export const user_tasks = derived([ tasks, user ], ([ $tasks, $user ]) => {
    let logged_in_user_tasks = [];

    console.log($user);

    if ($user && $user.email) {
        logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email);
    }

    return logged_in_user_tasks;
});