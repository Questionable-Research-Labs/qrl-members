<script lang="ts">
    import {page} from "$app/stores";
import { createClient } from "$lib/authService";
    import Header from "$lib/components/Header.svelte";
import { onMount } from "svelte";

    onMount(async () => {
        createClient()

    });
</script>

{#if $page.path !== "/"}
    <Header />
{/if}
<slot/>