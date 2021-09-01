<script type="ts">
	import CheckBox from "./components/CheckBox.svelte";
	import Container from "./components/Container.svelte";
	import PersonCard from "./components/PersonCard.svelte";
	import SearchBox from "./components/SearchBox.svelte";
	import Delete from "./icons/delete.svelte";

	import PersonEditor from "./modals/PersonEditor.svelte";

	import { Person } from "./types/person";

	import { DisplayListItem } from "./types/display";
	import type { List } from "./types/display";
	import FloatActionButton from "./components/FloatActionButton.svelte";
	import db from "./api/db";
	import ActionBtn from "./components/ActionBtn.svelte";
	import PersonValidator from "./modals/PersonValidator.svelte";
	import { onMount } from "svelte";

	let personEditor: PersonEditor;
	let personValidator: PersonValidator;
	let displayItemsCount: number = 0;
	let personList: List<Person> = [];

	let checkAll: boolean = false;
	let indeterminate: boolean = false;

	const searchChange = (searchTerm: string) => {
		let tmpCount: number = 0;
		personList.forEach((pDLI) => {
			pDLI.displayed =
				pDLI.item.name.value
					.toLocaleLowerCase()
					.includes(searchTerm.toLocaleLowerCase()) ||
				pDLI.item.lastName.value
					.toLocaleLowerCase()
					.includes(searchTerm.toLocaleLowerCase());
			if (pDLI.displayed) tmpCount++;
		});
		displayItemsCount = tmpCount;
		personList = personList;
	};

	//CheckBox handler of main checkbox
	function onCheckAll(newValue: boolean) {
		personList.forEach((pDLI) => (pDLI.selected = newValue));
		personList = personList;
		if (!newValue) {
			indeterminate = false;
		}
	}

	//Set checkAll and indeterminate of main checkbox on personCard's checkbox change
	function persionChecked(_pDLI: DisplayListItem<Person>, _newValue: boolean) {
		let checkCount = 0;
		personList.forEach((pDLI) => (checkCount += pDLI.selected ? 1 : 0));
		if (checkCount === 0) {
			checkAll = false;
			indeterminate = false;
		} else {
			if (checkCount === personList.length) {
				checkAll = true;
				indeterminate = false;
			} else {
				checkAll = false;
				indeterminate = true;
			}
		}
	}

	async function deleteSelection() {
		let deleteList: Array<Person> = [];
		personList.forEach((p) => {
			if (p.displayed && p.selected) deleteList.push(p.item);
		});
		if (deleteList.length > 0) {
			console.log("To be deleted:", deleteList);
			deleteList.forEach(async (d) => {
				let deleted = await db.delete(d);
				if (!deleted.success)
					console.error("delete ", d, " failed ", deleted.event);
			});
		} else {
			//Selection may be hidden by searchTerm
			alert(
				"Clear search box, selection list mey be hidden due to filteration"
			);
		}
	}

	//This function will pass to personEditor as onsuccess,
	//or to db.delete as onsuccess,whenever a person createted/deleted this fn will called
	//at this moment we will refresh list
	async function Refresh(_: any) {
		personList = [];
		let list = await db.list("personApprovalStore");
		if (list.success) {
			list.data.forEach((ps: any) =>
				personList.push(new DisplayListItem(Person.fromStore(ps)))
			);
			checkAll = false;
			indeterminate = false;
			personList = personList;
			displayItemsCount = personList.length;
		}
	}

	onMount(async () => {
		await Refresh(null);
	});
</script>

<main class="main">
	<div class="topBar">
		<SearchBox onChange={searchChange} />
		<div class="actionBar">
			<ActionBtn
				onClick={() => deleteSelection()}
				classes="danger-fg"
				disabled={!(checkAll || indeterminate) || displayItemsCount === 0}
				disabledClasses="primary-fg"
			>
				<Delete />
			</ActionBtn>
			<CheckBox
				bind:checked={checkAll}
				bind:indeterminate
				onChange={onCheckAll}
			/>
		</div>
	</div>
	<div class="spacer" />
	<Container>
		{#each personList as personDLI}
			<PersonCard
				{personDLI}
				onSelect={persionChecked}
				onEdit={(p) => personEditor.editPerson(p, Refresh)}
				onCheck={(p) => personValidator.validatePerson(p, Refresh)}
			/>
		{/each}
	</Container>
	<FloatActionButton onClick={() => personEditor.newPerson(Refresh)}
		>+</FloatActionButton
	>
	<PersonEditor bind:this={personEditor} />
	<PersonValidator bind:this={personValidator} />
</main>

<style>
	.actionBar {
		margin: 1rem 0px 1rem 0px;
		display: flex;
		justify-content: space-between;
	}
	.topBar {
		background-color: var(--primary-bg);
		height: 5.3rem;
		left: 0px;
		padding: 1rem 1.19rem 0rem 1.45rem;
		position: fixed;
		right: 0px;
		top: 0px;
		z-index: 1000;
	}
	.spacer {
		height: 6rem;
	}
</style>
