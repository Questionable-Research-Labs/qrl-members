<script lang="ts">
    import { page } from "$app/stores";
    import { createClient } from "$lib/authService";
    import { onMount } from "svelte";

    import { Styles } from 'sveltestrap';

    onMount(async () => {
        createClient();
    });
</script>
<Styles />

<slot />
