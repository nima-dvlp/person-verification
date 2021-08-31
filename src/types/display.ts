/**
 * DisplayListItem interface handle items in a list for displaying purpose,
 * This make us able to handle selected and displaying item without any change
 * on item type!
 */
export class DisplayListItem<T> {
	selected: boolean;
	displayed: boolean;
	item: T;

	constructor(item: T) {
		this.selected = false;
		this.displayed = true;
		this.item = item;
	}
}

/**
 * List, an array of DisplayListItem<T>
 */
export type List<T> = Array<DisplayListItem<T>>;
