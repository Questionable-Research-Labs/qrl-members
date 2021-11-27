<script lang="ts">
    import { browser } from "$app/env";

    import { goto } from "$app/navigation";

    import { auth0Ready, isAuthenticated } from "$lib/store";
    import { get } from "svelte/store";

    import Header from "$lib/components/Header.svelte";

    $: {
        if (browser && $auth0Ready && !$isAuthenticated) {
            goto("/");
        }
        console.log(get(auth0Ready), get(isAuthenticated));
    }
</script>

<div class="content-container">
    <div class="content-wrapper">
        <Header/>
        {#if $isAuthenticated}
            <slot />
        {:else}
            loading
        {/if}
    </div>
</div>

<style lang="scss">
    .content-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        background-color: grey;
        .content-wrapper {
            background-color: white;
            height: 95vh;
            width: 95vw;
            display: flex;
            flex-direction: column;
        }
    }
</style>
