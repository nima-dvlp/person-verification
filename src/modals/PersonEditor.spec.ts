/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {render, act, fireEvent} from '@testing-library/svelte';
import {tick} from 'svelte';
import db from '../api/db';
import {Person} from '../types/person';

import PersonEditor from './PersonEditor.svelte';

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

window.alert = (message: string) => {console.log("ALERT:", message)};

it("PersonEditor", async () => {

	await db.initDB();
	//Wait till db get ok;
	while (!db.ok)
		await sleep(100);

	const res = render(PersonEditor);

	/**
	 * In any step of Svelte update this reference (person)
	 * will get update too, so for test purpose we need it to be 
	 * updated reference!
	 */
	let person = () => res.component.$$.ctx[res.component.$$.props["person"]] as Person;

	let editPerson = res.component.$$.ctx[res.component.$$.props["editPerson"]];
	//console.log(person());

	/**
	 * the person passed to the PersonEditor
	 */
	let thePerson = new Person(123, 1234, "Nima", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");

	//console.log(res.component.$$.ctx);
	editPerson(thePerson, (_e: any) => {});
	await act();
	//console.log(res.component.$$.ctx);
	//console.log(person());

	const form = document.forms[0];

	const nameInput = document.getElementById("nameInput") as HTMLInputElement;
	const lastNameInput = document.getElementById("lastNameInput") as HTMLInputElement;
	const mobileInput = document.getElementById("mobileInput") as HTMLInputElement;
	const idInput = document.getElementById("idInput") as HTMLInputElement;
	const birthDateInput = document.getElementById("birthDateInput") as HTMLInputElement;
	const addressInput = document.getElementById("addressInput") as HTMLInputElement;

	expect(nameInput.value).toBe(thePerson.name.value);
	expect(lastNameInput.value).toBe(thePerson.lastName.value);
	expect(mobileInput.value).toBe(thePerson.mobile.value);
	expect(idInput.value).toBe(thePerson.idNo.value.toString());
	expect(birthDateInput.value).toBe(thePerson.birthDate.value.toISOString().split("T")[0]);
	expect(addressInput.value).toBe(thePerson.address.value);

	await fireEvent.input(nameInput, {target: {value: "Amin"}});
	await fireEvent.input(lastNameInput, {target: {value: "Ariaei"}});
	await fireEvent.input(mobileInput, {target: {value: "0917xXx2002"}});
	await fireEvent.input(idInput, {target: {value: "321"}});
	await fireEvent.input(birthDateInput, {target: {value: "2020-11-07"}});
	await fireEvent.input(addressInput, {target: {value: "Tehran"}});

	form.submit();

	await act();
	await tick();


	let editedPerson = person();
	//console.log(editedPerson.storeVersion());
	expect(nameInput.value).toBe(editedPerson.name.value);
	expect(lastNameInput.value).toBe(editedPerson.lastName.value);
	expect(mobileInput.value).toBe(editedPerson.mobile.value);
	expect(idInput.value).toBe(editedPerson.idNo.value.toString());
	expect(birthDateInput.value).toBe(editedPerson.birthDate.value.toISOString().split("T")[0]);
	expect(addressInput.value).toBe(editedPerson.address.value);
})

it("PersonEditor", async () => {

	await db.initDB();
	//Wait till db get ok;
	while (!db.ok)
		await sleep(100);

	const res = render(PersonEditor);

	/**
	 * In any step of Svelte update this reference (person)
	 * will get update too, so for test purpose we need it to be 
	 * updated reference!
	 */
	let person = () => res.component.$$.ctx[res.component.$$.props["person"]] as Person;

	let editPerson = res.component.$$.ctx[res.component.$$.props["editPerson"]];
	//console.log(person());

	/**
	 * the person passed to the PersonEditor
	 */
	let thePerson = new Person(123, 1234, "", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");

	//console.log(res.component.$$.ctx);
	editPerson(thePerson, (_e: any) => {});
	await act();
	//console.log(res.component.$$.ctx);
	//console.log(person());

	const form = document.forms[0];

	const nameInput = document.getElementById("nameInput") as HTMLInputElement;
	const lastNameInput = document.getElementById("lastNameInput") as HTMLInputElement;
	const mobileInput = document.getElementById("mobileInput") as HTMLInputElement;
	const idInput = document.getElementById("idInput") as HTMLInputElement;
	const birthDateInput = document.getElementById("birthDateInput") as HTMLInputElement;
	const addressInput = document.getElementById("addressInput") as HTMLInputElement;

	expect(nameInput.value).toBe(thePerson.name.value);
	expect(lastNameInput.value).toBe(thePerson.lastName.value);
	expect(mobileInput.value).toBe(thePerson.mobile.value);
	expect(idInput.value).toBe(thePerson.idNo.value.toString());
	expect(birthDateInput.value).toBe(thePerson.birthDate.value.toISOString().split("T")[0]);
	expect(addressInput.value).toBe(thePerson.address.value);

	form.submit();

	await act();
	await tick();


	let editedPerson = person();
	console.log(editedPerson.storeVersion());
	expect(nameInput.value).toBe(editedPerson.name.value);
	expect(lastNameInput.value).toBe(editedPerson.lastName.value);
	expect(mobileInput.value).toBe(editedPerson.mobile.value);
	expect(idInput.value).toBe(editedPerson.idNo.value.toString());
	expect(birthDateInput.value).toBe(editedPerson.birthDate.value.toISOString().split("T")[0]);
	expect(addressInput.value).toBe(editedPerson.address.value);
})
