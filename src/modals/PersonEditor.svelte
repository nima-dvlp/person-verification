<script type="ts">
	import { tick } from "svelte";
	import Camera from "../icons/camera.svelte";

	import { Person } from "../types/person";
	import db from "../api/db";

	export let person: Person = Person.new();

	let showModal: boolean = false;
	let imageSrc: string = "";

	//The input element of name entery, just used to set focus on show!
	let nameInput: HTMLInputElement;

	//fileInput used to keep a reference to the fileInput element,
	//fileInput.click() make a fileChoser available to the user!
	//used in onPicSelect instead of handling event
	let fileInput: HTMLInputElement;

	//Date is not manageable by Svelte bindings, so we need to handle it...
	let dateString: string;

	let onDBSuccessHandler: (e: any) => void = (_) => {};
	function onDBSuccess(e: any) {
		showModal = false;
		//notify the caller of newPerson that insert is successful
		onDBSuccessHandler(e);
	}
	export async function newPerson(onSuccess: (e: any) => void) {
		person = new Person(null, null, "", "", "", new Date(), "", "");
		dateString = "mm/dd/yyyy";
		showModal = true;
		onDBSuccessHandler = onSuccess;
		await tick();
		nameInput.focus();
	}

	export async function editPerson(p: Person, onSuccess: (e: any) => void) {
		person = p.clone();
		dateString = p.birthDate.value.toISOString().split("T")[0];
		imageSrc = p.pic.value;
		showModal = true;
		onDBSuccessHandler = onSuccess;
		await tick();
		nameInput.focus();
	}

	//This method actually is a simple on:change event, and will raise from the fileInput element
	function onPicSelect() {
		if (fileInput.files.length === 1) {
			let fl = fileInput.files[0];
			if (fl.type === "image/png" || fl.type === "image/jpeg") {
				let flr: FileReader = new FileReader();
				flr.onloadend = () => {
					imageSrc = flr.result.toString();
				};
				flr.readAsDataURL(fl);
			} else {
				alert("Just Png/Jpeg files are acceptable!");
			}
		}
	}

	async function onOk(): Promise<boolean> {
		console.log(person);
		let msg: string = "";
		const pushMsg = (newMsg: string) => {
			msg.length;
			if (msg.length > 0) msg += "\n" + newMsg;
			else msg = newMsg;
		};

		if (person.name.value.length <= 2) pushMsg("Name required");
		if (person.lastName.value.length <= 0) pushMsg("Last name is required");
		if (person.mobile.value.length <= 10) pushMsg("Mobile is required");

		if (person.idNo.value === null)
			pushMsg("The ID must be A Number and required");

		if (new Date(dateString).toJSON() === null) {
			pushMsg("Birth date is invalid or not entered, required");
		} else {
			//console.log("Date accepted ????!", dateString);
			person.birthDate.value = new Date(dateString);
		}
		if (person.address.value.length <= 5) pushMsg("Address is required");

		if (imageSrc.length === 0)
			pushMsg("No picture selected, Profile picture is required");
		else person.pic.value = imageSrc;

		if (msg.length > 0) {
			alert(msg);
		} else {
			if (person.id === null) {
				let insert = await db.insert(person);
				if (!insert.success) {
					alert(insert.event);
				} else {
					onDBSuccess(null);
				}
			} else {
				let update = await db.update(person);
				if (!update.success) {
					alert(update.event);
				} else {
					onDBSuccess(null);
				}
			}
		}

		return false;
	}
</script>

{#if showModal}
	<div class="fullScreen">
		<form
			on:submit={async (e) => {
				e.preventDefault();
				return await onOk();
			}}
		>
			<div class="detail">
				<label for="nameInput">Name: </label>
				<input
					id="nameInput"
					bind:this={nameInput}
					bind:value={person.name.value}
					minlength={3}
					required
				/>

				<label for="lastNameInput">Family Name: </label>
				<input
					id="lastNameInput"
					bind:value={person.lastName.value}
					minlength={3}
					required
				/>

				<label for="mobileInput">Mobil: </label>
				<input
					id="mobileInput"
					bind:value={person.mobile.value}
					required
					minlength={11}
					maxlength={11}
				/>

				<label for="idInput">ID No.: </label>
				<input
					id="idInput"
					bind:value={person.idNo.value}
					type="number"
					required
				/>

				<label for="birthDateInput">Birth date: </label>
				<input
					id="birthDateInput"
					bind:value={dateString}
					type="date"
					required
				/>

				<label for="addressInput">Address: </label>
				<input
					id="addressInput"
					bind:value={person.address.value}
					required
					minlength={5}
				/>
			</div>
			<div class="detail" style="align-items: unset; padding-top: 0.5rem;">
				<label for="fileInput">Profile Pic</label>
				<div
					class="imageWrapper"
					on:click={() => fileInput.click()}
					style="background-image: url({imageSrc});"
				>
					<div class="imageShade {imageSrc === '' ? 'show' : ''}">
						<Camera className="camIcon" />
					</div>
				</div>
				<input
					id="fileInput"
					type="file"
					bind:this={fileInput}
					style="display: none;"
					accept="image/*"
					on:change={(_) => onPicSelect()}
				/>
			</div>
			<div style="direction: rtl; margin-right: 1rem; margin-top: 4.375rem;">
				<button class="secondary" type="submit">save</button>

				<button
					type="button"
					class="dander"
					on:click={(_) => (showModal = false)}>back</button
				>
			</div>
		</form>
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
	:global(.imageWrapper) {
		position: relative;
		border: 1px solid var(--secondary-bg);
		width: 102px;
		height: 129px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
		border-radius: 0px 0px 5px 5px;
		cursor: pointer;
		overflow: hidden;
		background-position: center;
		background-size: 100% auto;
		background-repeat: no-repeat;
	}

	:global(.imageShade) {
		position: absolute;
		display: none;
		top: 0px;
	}

	.imageWrapper:hover .imageShade {
		display: block;
	}
	:global(.camIcon) {
		position: absolute;
		margin: auto;
		top: 44px;
		left: 32px;
		background-color: rgba(110, 235, 231, 0.21);
		border-radius: 50.8%;
		height: 35px;
		width: 35px;
		padding: 1px 5px 5px 4px;
	}
</style>
