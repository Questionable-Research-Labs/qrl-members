<script lang='ts'>

    import auth from '../authService';
    import { onMount } from 'svelte';
    import { isAuthenticated, user } from '../store';
    import { Auth0Client } from '@auth0/auth0-spa-js';

    let auth0Client: Auth0Client;

    onMount(async () => {
        auth0Client = await auth.createClient();
        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());
    });

    function login() {
        auth.loginWithPopup(auth0Client, {});
    }

    function logout() {
        auth.logout(auth0Client);
    }

</script>


{#if $isAuthenticated}
    <h1>Woah You're Logged in!!</h1>
    <p>{JSON.stringify($user)}</p>
    <button on:click='{logout}'>Log Out</button>

{:else}
    <h1>damn not authed what a pleb</h1>
    <button on:click='{login}'>Log In</button>

{/if}

