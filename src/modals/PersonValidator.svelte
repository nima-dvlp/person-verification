<script type="ts">
	import { tick } from "svelte";

	import { Person } from "../types/person";
	import db from "../api/db";

	export let person: Person = Person.new();

	let showModal: boolean = false;
	let imageSrc: string = "";

	//Date is not manageable by Svelte bindings, so we need to handle it...
	let dateString: string;

	let onDBSuccessHandler: (e: any) => void = (_) => {};
	function onDBSuccess(e: any) {
		showModal = false;
		//notify the caller of newPerson that insert is successful
		onDBSuccessHandler(e);
	}

	function validateField(f: string, validated: boolean) {
		person[f].verified = validated;
	}

	export async function validatePerson(
		p: Person,
		onSuccess: (e: any) => void
	) {
		person = p.clone();
		dateString = p.birthDate.value.toISOString().split("T")[0];
		imageSrc = p.pic.value;
		showModal = true;
		onDBSuccessHandler = onSuccess;
	}

	async function onOk() {
		let update = await db.update(person);
		if (!update.success) {
			alert(update.event);
			return;
		}
		onDBSuccess(null);
	}
</script>

{#if showModal}
	<div class="fullScreen">
		<div class="detail">
			<div class="detailLabel">Name:</div>
			<div>
				<div class="detailValue {person.name.verified ? 'validated' : ''}">
					{person.name.value}
				</div>
				<div style="float: right; ">
					<div
						on:click={() => validateField("name", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("name", true)}
						class="checkIcon"
					/>
				</div>
			</div>

			<div class="detailLabel">Family Name:</div>
			<div>
				<div
					class="detailValue {person.lastName.verified ? 'validated' : ''}"
				>
					{person.lastName.value}
				</div>
				<div style="float: right; ">
					<div
						on:click={() => validateField("lastName", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("lastName", true)}
						class="checkIcon"
					/>
				</div>
			</div>

			<div class="detailLabel">Mobil:</div>
			<div>
				<div
					class="detailValue {person.mobile.verified ? 'validated' : ''}"
				>
					{person.mobile.value}
				</div>
				<div style="float: right; ">
					<div
						on:click={() => validateField("mobile", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("mobile", true)}
						class="checkIcon"
					/>
				</div>
			</div>

			<div class="detailLabel">ID No.:</div>
			<div>
				<div class="detailValue {person.idNo.verified ? 'validated' : ''}">
					{person.idNo.value}
				</div>
				<div style="float: right; ">
					<div
						on:click={() => validateField("idNo", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("idNo", true)}
						class="checkIcon"
					/>
				</div>
			</div>

			<div class="detailLabel">Birth date:</div>
			<div>
				<div
					class="detailValue {person.birthDate.verified
						? 'validated'
						: ''}"
				>
					{dateString}
				</div>
				<div style="float: right; ">
					<div
						on:click={() => validateField("birthDate", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("birthDate", true)}
						class="checkIcon"
					/>
				</div>
			</div>

			<div class="detailLabel">Address:</div>
			<div>
				<div
					class="detailValue {person.address.verified ? 'validated' : ''}"
				>
					{person.address.value}
				</div>
				<div style="float: right; ">
					<div
						on:click={() => validateField("address", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("address", true)}
						class="checkIcon"
					/>
				</div>
			</div>
		</div>
		<div class="detail" style="align-items: unset; padding-top: 3rem;">
			<div class="detailLabel" style="line-height: 0.75rem;">
				Profil Pic:
			</div>
			<div>
				<div
					class="imageWrapper {person.pic.verified ? 'validatedPic' : ''}"
					style="background-image: url({imageSrc});"
				/>
				<div style="float: right; ">
					<div
						on:click={() => validateField("pic", false)}
						class="uncheckIcon"
					/>
					<div
						on:click={() => validateField("pic", true)}
						class="checkIcon"
					/>
				</div>
			</div>
		</div>
		<div style="direction: rtl; margin-right: 1rem; margin-top: 4.375rem;">
			<button class="secondary" on:click={() => onOk()}>save</button>

			<button
				type="button"
				class="dander"
				on:click={(_) => (showModal = false)}>back</button
			>
		</div>
	</div>
{/if}

<style>
	.fullScreen {
		position: fixed;
		z-index: 1001;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		padding: 2.18rem 2.37rem 0px 1.75rem;
		background-color: var(--primary-bg);
		overflow-y: scroll;
	}
	.detail {
		display: grid;
		grid-template-columns: 7.31rem minmax(0, 1fr);
		align-items: center;
	}
	.imageWrapper {
		border: 2px solid transparent;
		position: relative;
		width: 102px;
		height: 129px;
		border-radius: 5px;
		overflow: hidden;
		background-position: center;
		background-size: 100% auto;
		background-repeat: no-repeat;
		display: inline-block;
	}

	.detailLabel {
		font-size: 0.75rem;
		line-height: 2.55rem;
	}

	.detailValue {
		display: inline-block;
		width: calc(100% - 39px);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 0.75rem;
		line-height: 0.75rem;
		max-height: 0.75rem;
		font-weight: bold;
	}

	.checkIcon {
		display: inline-block;
		background-repeat: no-repeat;
		background-image: url("/imgs/checked.png");
		width: 14px;
		height: 14px;
	}

	.uncheckIcon {
		display: inline-block;
		background-image: url("/imgs/unchecked.png");
		width: 14px;
		height: 14px;
	}

	.validated {
		color: green;
	}

	.validatedPic {
		border: 2px solid green;
	}
</style>
