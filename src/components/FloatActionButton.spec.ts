/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import FloatActionButton from "./FloatActionButton.svelte";

import {fireEvent, render} from '@testing-library/svelte';

it('FloatActionButton test', async () => {

	let clickCount: number = 0;
	let onClick = () => {
		clickCount++;
	};

	let res = render(FloatActionButton, {
		props: {
			onClick,
		}
	});

	const fab = res.container.getElementsByClassName("fab")[0];
	await fireEvent.click(fab);
	expect(clickCount).toBe(1);
	await fireEvent.click(fab);
	expect(clickCount).toBe(2);
	await fireEvent.click(fab);
	expect(clickCount).toBe(3);
})
