<!--
	@component
	Float action button(FAB) will be shown on screen and available to the user
	for future custom action.
	
	This is just like the <button> HTML tag...

	properties:
	@property {()=>void} onClick Deliver an on click where the FAB used
-->
<script type="ts">
	export let onClick: () => void = () => {
		/*dummy handler to avoid an error or panic and */
	};
</script>

<button class="fab secondary" on:click={() => onClick()}><slot /></button>

<style>
	.fab {
		position: fixed;
		cursor: pointer;
		right: 1.31rem;
		bottom: 1.81rem;
		width: 2rem;
		height: 2rem;
		padding: 0px;
		border-radius: 50%;
		z-index: 1000;
	}
</style>
