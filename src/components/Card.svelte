<div class="card">
	<slot />
</div>

<style>
	:global(.card) {
		background-color: var(--card-bg);
		border: 1px solid var(--card-brd);
		border-radius: 5px;
		padding-top: 0.25rem;
		position: relative;
		width: 333px;
		height: 148px;
	}
</style>
