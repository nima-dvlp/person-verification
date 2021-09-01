/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import SearchBox from "./SearchBox.svelte";

import {fireEvent, render} from '@testing-library/svelte';

it('SearchBox test', async () => {
	let searchTerm: string = "";
	let onChange = (newValue: string) => {
		searchTerm = newValue;
	};

	let res = render(SearchBox, {
		props: {
			onChange,
			searchTerm: "Initial test",
		}
	});

	const searchBox = res.container.getElementsByClassName("searchBox")[0];
	expect(searchBox.getElementsByTagName("input")[0].value).toBe("Initial test");
	let input = searchBox.getElementsByTagName("input")[0];
	await fireEvent.input(input, {target: {value: "New Search TERM"}});
	expect(input.value).toBe("New Search TERM");
	expect(searchTerm).toBe("New Search TERM");
})
