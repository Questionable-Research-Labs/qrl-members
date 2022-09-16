<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<h1 class="text-light">Welcome to QRL</h1>
<h2 class="text">I'm a</h2>
<div class="buttons">
	<button
		class="text-light bg-light"
		on:click={async () => {
			await goto('/member');
		}}>Member</button
	>
	<button
		class="text-light bg-light"
		on:click={async () => {
			await goto('/guest');
		}}>Guest</button
	>
</div>

<style lang="scss">
	h1 {
		font-size: 25pt;
	}

	h2 {
		font-size: 20pt;
	}

	.buttons {
		display: flex;
		padding: 1rem;
		gap: 2rem;
	}

	button {
		width: 20rem;
		height: 14rem;
		font-size: 20pt;
		font-weight: bold;
		flex: 1 1 0;
	}
</style>
