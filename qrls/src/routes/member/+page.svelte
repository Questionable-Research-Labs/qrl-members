<script>
	import { goto } from '$app/navigation';

	let no_show = false;
</script>

<div class="bg-light shadow blue-bar">
	<button
		class="back"
		on:click={async () => {
			await goto('/');
		}}>Back</button
	>

	<h2 class="text-light">Start typing your name and select it from the list below</h2>

	<input type="text" class="name-input bg text" />

	{#if no_show}
		<button class="text bg">
			Not showing up?<br />
			<span class="text-light">Sign in as guest</span>
		</button>
	{/if}
</div>

<style lang="scss">
	.bg-light {
		position: relative;
		padding: 2rem 5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		border-radius: 2px;
		box-shadow: 0 0 20px #222;

		input {
			font-size: 20pt;
			border: none;
			padding: 1rem;

			&:focus-visible {
				outline: none;

				&::before {
					content: '';
				}
			}
		}

		button {
			padding: 2rem;
			font-size: 14pt;
			line-height: 2rem;
			span {
				font-size: 15pt;
				font-weight: bold;
			}
		}
	}
</style>
