<script type="ts">
	import Checked from "../icons/checked.svelte";
	import Indeterminate from "../icons/indeterminate.svelte";

	export let indeterminate: boolean = false;
	export let checked: boolean = false;

	export let onChange: (newValue: boolean) => void = null;

	function clickHandler() {
		if (indeterminate) {
			indeterminate = false;
		}
		checked = !checked;
		if (onChange) {
			onChange(checked);
		} else {
			console.log("onChange not assigned");
		}
	}
</script>

<div class="checkBox" on:click={() => clickHandler()}>
	{#if checked === true}
		<Checked className="checked" />
	{:else if indeterminate}
		<Indeterminate className="indeterminate" />
	{/if}
</div>

<style global>
	:global(.checkBox) {
		position: relative;
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 1px solid var(--primary-fg);
		border-radius: 3px;
		background-color: white;
	}

	:global(.checked) {
		position: absolute;
		top: -3px;
		right: 1px;
	}

	:global(.indeterminate) {
		position: absolute;
		top: -4px;
		right: 3px;
	}
</style>
