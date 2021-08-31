<script type="ts">
	import Edit from "../icons/edit.svelte";
	import Tag from "../icons/tag.svelte";
	import Card from "./Card.svelte";
	import CheckBox from "./CheckBox.svelte";
	import type { Person } from "../types/person";
	import type { DisplayListItem } from "../types/display";
	import ActionBtn from "./ActionBtn.svelte";

	export let personDLI: DisplayListItem<Person>;
	export let onSelect: (
		pDLI: DisplayListItem<Person>,
		newValue: boolean
	) => void = null;

	export let onCheck: (p: Person) => void = null;

	export let onEdit: (p: Person) => void = null;

	function onSelectClick(newValue: boolean) {
		if (onCheck) {
			onSelect(personDLI, newValue);
		} else {
			console.error("onCheck not assigned");
		}
	}

	function onCheckClick() {
		if (onCheck) {
			onCheck(personDLI.item);
		} else {
			console.log("onCheck not assigned");
		}
	}

	function onEditClick() {
		if (onEdit) {
			onEdit(personDLI.item);
		} else {
			console.log("onEdit not assigned");
		}
	}
</script>

{#if personDLI.displayed}
	<Card>
		<div class="actionBar">
			<ActionBtn onClick={() => onEditClick()}>
				<Edit className="inline-block" />
			</ActionBtn>
			<CheckBox bind:checked={personDLI.selected} onChange={onSelectClick} />
		</div>

		<div class="picture">
			<img src={personDLI.item.pic.value} alt="" />
		</div>

		<div class="detail">
			<div>Name:</div>
			<div>{personDLI.item.name.value}</div>
			<div>Last Name:</div>
			<div>{personDLI.item.lastName.value}</div>
			<div>Birth date:</div>
			<div>{personDLI.item.birthDate.value.toISOString().split("T")[0]}</div>
			<div>ID No.:</div>
			<div>{personDLI.item.idNo.value}</div>
		</div>

		<div
			class="verification {personDLI.item.verified
				? 'success-fg'
				: 'danger-fg'}"
		>
			<Tag />
		</div>
		<button class="checkBtn secondary" on:click={() => onCheckClick()}
			>check</button
		>
	</Card>
{/if}

<style>
	.actionBar {
		position: absolute;
		top: 4px;
		right: 4px;
	}

	.picture {
		position: absolute;
		width: 102px;
		height: 129px;
		left: 11px;
		top: 11px;
		background-color: red;
		border-radius: 5px;
	}

	.checkBtn {
		position: absolute;
		bottom: 6px;
		right: 6px;
		margin: unset;
	}

	.detail {
		position: absolute;
		top: 20px;
		left: 121px;
		width: 200px;
		height: 92px;
		display: grid;
		grid-template-columns: 5.1rem auto;
	}

	.detail div {
		font-size: 0.75rem;
		line-height: 1rem;
		height: 1rem;
	}

	.detail div:nth-child(even) {
		font-weight: bold;
	}

	.verification {
		position: absolute;
		top: 121px;
		left: 124px;
	}
</style>
