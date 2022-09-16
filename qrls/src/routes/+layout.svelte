<script lang="ts">
	import Logo from '$lib/Logo.svelte';
</script>

<div class="sign-in">
	<Logo class="logo" />

	<slot />
</div>

<style lang="scss" global>
	* {
		margin: 0;
		box-sizing: border-box;
	}

	.bg {
		background-color: #1e1e1e;
	}

	.bg-light {
		background-color: #333;
	}

	.shadow {
		box-shadow: 0 0 1rem #eee;
	}

	.blue-bar {
		border-left: rgb(0, 113, 179) 4px solid;
	}

	.sign-in {
		display: flex;
		align-items: center;
		// justify-content: center;
		padding-top: 5rem;
		flex-direction: column;
		height: 100%;
		min-height: 100vh;
		gap: 1rem;
	}

	body {
		width: 100%;
		max-width: 100vw;
		background-color: #1e1e1e;
		font-family: 'Roboto', sans-serif;
	}

	.text {
		color: #cacaca;
	}

	.text-light {
		color: #fff;
	}

	svg {
		outline: #fff;
		stroke: #fff;
		fill: #fff;
	}

	.logo {
		width: 15rem;
		height: 15rem;
	}

	button {
		text-align: center;
		border: none;
		transition: all 0.1s ease-in-out;

		&:hover {
			transform: translateY(-0.5em);
			box-shadow: 0px 0px 1rem #252525;
			cursor: pointer;
		}

		.back {
			position: absolute;
			left: 1em;
			top: 1em;
		}
	}
</style>
