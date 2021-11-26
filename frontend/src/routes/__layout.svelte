<script lang="ts">
    import {page} from "$app/stores";
    import Header from "$lib/compoments/Header";
</script>

{#if $page.path !== "/"}
    <Header />
{/if}