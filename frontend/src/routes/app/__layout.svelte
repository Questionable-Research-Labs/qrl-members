<script lang="ts">
    import { browser } from "$app/env";

    import { goto } from "$app/navigation";

    import { auth0Ready, isAuthenticated } from "$lib/store";
    import { get } from "svelte/store";
    $: {
        if (browser && $auth0Ready && !$isAuthenticated) {
            goto("/");
        }
        console.log(get(auth0Ready),get(isAuthenticated))
    }
</script>

{#if $isAuthenticated}
    <slot />
{:else}
loading
{/if}
