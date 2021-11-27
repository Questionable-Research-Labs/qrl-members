<script lang='ts'>

    import {createClient, loginWithPopup, logout} from '$lib/authService';
    import { onMount } from 'svelte';
    import { isAuthenticated, auth0Ready } from '$lib/store';
    import { goto } from "$app/navigation";
import { get } from 'svelte/store';


    function login() {
        loginWithPopup({});
    }

    onMount(() => {
        isAuthenticated.subscribe((auth) => {
            if (get(auth0Ready) && auth) {
                goto("/app");
            }
            console.log(auth,get(auth0Ready))
        });
    });

</script>
{#if $auth0Ready}
    <h1>Gimme a sec im loading</h1>
{:else}

    {#if !$isAuthenticated}
        <h1>damn not authed what a pleb</h1>
        <button on:click='{login}'>Log In</button>
    {/if}

{/if}
