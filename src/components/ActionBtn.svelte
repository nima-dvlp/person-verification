<!--
	@component
	A simple wrapper for other components like Icon or Text(div/span...)
	to make them action button.
	Action's may be enable or disable, classes will be applied on enabled 
	action buttons and disabledClasses is applied otherwise.
	onClick will be ignored for disabled action button...
-->
<script type="ts">
	export let onClick: () => void = () => {};
	export let disabled: boolean = false;
	export let block: boolean = false;
	export let disabledClasses: string = "";
	export let classes: string = "";
	function clickHandler() {
		if (!disabled && onClick) onClick();
	}
</script>

<div
	class="actionBtn {block ? 'show' : ''} {disabled
		? disabledClasses + ' actionBtnDisabled '
		: classes}"
	on:click={() => clickHandler()}
>
	<slot />
</div>

<style>
	.actionBtn {
		cursor: pointer;
		display: inline-block;
	}
	.actionBtnDisabled {
		cursor: default;
	}
</style>
