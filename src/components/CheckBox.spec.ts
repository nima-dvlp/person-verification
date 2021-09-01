/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {render, fireEvent} from '@testing-library/svelte';

import CheckBox from "./CheckBox.svelte";


it('CheckBox in default ascpect works', async () => {
	//Just shut the console.log ~> onChange not assigned of.
	let onChange = (_: boolean) => {};

	const res = render(CheckBox, {
		props: {
			onChange: onChange,
			checked: false,
			indeterminate: false
		}
	});
	const checkBox = res.container.getElementsByClassName("checkBox")[0];
	await fireEvent.click(checkBox);
	expect(checkBox.getElementsByTagName('div')[0].className).toBe("checked");
	await fireEvent.click(checkBox);
	expect(checkBox.getElementsByTagName('div')).toHaveLength(0);
	await fireEvent.click(checkBox);
	expect(checkBox.getElementsByTagName('div')[0].className).toBe("checked");

})

it('CheckBox in indeterminate', async () => {
	//Just shut the console.log ~> onChange not assigned of.
	let onChange = (_: boolean) => {};
	const res = render(CheckBox, {
		onChange: onChange,
		checked: false,
		indeterminate: true
	});
	const checkBox = res.container.getElementsByClassName("checkBox")[0];
	expect(checkBox.getElementsByTagName('div')[0].className).toBe("indeterminate");
	await fireEvent.click(checkBox);
	expect(checkBox.getElementsByTagName('div')[0].className).toBe("checked");
	await fireEvent.click(checkBox);
	expect(checkBox.getElementsByTagName('div')).toHaveLength(0);
	await fireEvent.click(checkBox);
	expect(checkBox.getElementsByTagName('div')[0].className).toBe("checked");

})
