<div class="container">
	<slot />
</div>

<style>
	:global(.container) {
		display: grid;
		grid-template-columns: repeat(auto-fill, 350px);
	}

	:global(.container .card) {
		margin-bottom: 1rem;
	}
</style>
