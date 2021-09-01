/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import ActionBtn from "./ActionBtn.svelte";

import {render} from '@testing-library/svelte';

it('ActionButton in enable mode', async () => {
	let onClick = () => {};

	let res = render(ActionBtn, {
		props: {
			onClick,
			disabled: false,
			block: false,
			disabledClasses: "disabled",
			classes: "enabled",
		}
	});

	const actionBtn = res.container.getElementsByClassName("actionBtn")[0];

	const allExpectedClassesMeets = actionBtn.classList.contains('actionBtn') &&
		actionBtn.classList.contains('enabled');
	expect(allExpectedClassesMeets).toBe(true);

})

it('ActionButton in enable block mode', async () => {
	let onClick = () => {};

	let res = render(ActionBtn, {
		props: {
			onClick,
			disabled: false,
			block: true,
			disabledClasses: "disabled",
			classes: "enabled",
		}
	});

	const actionBtn = res.container.getElementsByClassName("actionBtn")[0];

	const allExpectedClassesMeets = actionBtn.classList.contains('actionBtn') &&
		actionBtn.classList.contains('show') &&
		actionBtn.classList.contains('enabled');
	expect(allExpectedClassesMeets).toBe(true);

})

it('ActionButton in disable mode', async () => {
	let onClick = () => {};

	let res = render(ActionBtn, {
		props: {
			onClick,
			disabled: true,
			block: false,
			disabledClasses: "disabled",
			classes: "enabled",
		}
	});

	const actionBtn = res.container.getElementsByClassName("actionBtn")[0];

	const allExpectedClassesMeets = actionBtn.classList.contains('actionBtn') &&
		actionBtn.classList.contains('disabled');
	expect(allExpectedClassesMeets).toBe(true);

})
