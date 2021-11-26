<script lang='ts'>

    import auth from '$lib/authService';
    import { onMount } from 'svelte';
    import { isAuthenticated, isLoading, user } from '$lib/store';
    import { Auth0Client } from '@auth0/auth0-spa-js';
    import { goto } from "$app/navigation"

    let auth0Client: Auth0Client;

    onMount(async () => {
        auth0Client = await auth.createClient();
        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());
        isLoading.set(false);
    });

    function login() {
        auth.loginWithPopup(auth0Client, {});
    }

    function logout() {
        auth.logout(auth0Client);
    }

    if ($isAuthenticated) {
        goto("/app");
    }

</script>
{#if $isLoading}
    <h1>Gimme a sec im loading</h1>
{:else}

    {#if !$isAuthenticated}
        <h1>damn not authed what a pleb</h1>
        <button on:click='{login}'>Log In</button>
    {/if}

{/if}
