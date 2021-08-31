import type {Storable} from "../api/db";

/**
 * VerifiableValue class, make simple even structured types to a verifyable type
 */
export class VerifiableValue<T> {
	value: T;
	verified: boolean;

	/**
	 * @constructor
	 * Make a non verified VerifiableValue
	 */
	constructor(value: T) {
		this.value = value;
		this.verified = false;
	}
}

export class Person implements Storable {



	storeName: string;
	keyField: string;

	id: number | null;
	idNo: VerifiableValue<number | null>;
	name: VerifiableValue<string>;
	lastName: VerifiableValue<string>;
	mobile: VerifiableValue<string>;
	birthDate: VerifiableValue<Date>;
	address: VerifiableValue<string>;
	pic: VerifiableValue<string>;

	constructor(id: number | null, idNo: number | null, name: string, lastName: string, mobile: string,
		birthDate: Date, address: string, pic: string) {
		this.storeName = "personApprovalStore";
		this.keyField = "id";
		this.id = id;
		this.idNo = new VerifiableValue(idNo);
		this.name = new VerifiableValue(name);
		this.lastName = new VerifiableValue(lastName);
		this.mobile = new VerifiableValue(mobile);
		this.birthDate = new VerifiableValue(birthDate);
		this.address = new VerifiableValue(address);
		this.pic = new VerifiableValue(pic);
	}

	/**
	 *new, make an empty Person object
	 */
	public static new(): Person {
		return new Person(null, null, "", "", "", new Date(), "", "");
	}

	public static fromStore(store: {
		id: number;
		idNo: number;
		name: string;
		lastName: string;
		mobile: string;
		birthDate: Date;
		address: string;
		pic: string;
		verifiedFields: Array<string>;

	}): Person {
		let per = new Person(
			store.id,
			store.idNo,
			store.name,
			store.lastName,
			store.mobile,
			store.birthDate,
			store.address,
			store.pic,
		);

		per.idNo.verified = store.verifiedFields.includes("idNo");
		per.name.verified = store.verifiedFields.includes("name");
		per.lastName.verified = store.verifiedFields.includes("lastName");
		per.mobile.verified = store.verifiedFields.includes("mobile");
		per.birthDate.verified = store.verifiedFields.includes("birthDate");
		per.address.verified = store.verifiedFields.includes("address");
		per.pic.verified = store.verifiedFields.includes("pic");

		return per;
	}

	/**
	 * clone, make a copy of Person object, useful when user trying to
	 * edit a person and we wont to make changes on actual reference
	 */
	public clone(): Person {
		let per = new Person(
			this.id,
			this.idNo.value,
			this.name.value,
			this.lastName.value,
			this.mobile.value,
			this.birthDate.value,
			this.address.value,
			this.pic.value,
		);

		per.idNo.verified = this.idNo.verified;
		per.name.verified = this.name.verified;
		per.lastName.verified = this.lastName.verified;
		per.mobile.verified = this.mobile.verified;
		per.birthDate.verified = this.birthDate.verified;
		per.address.verified = this.address.verified;
		per.pic.verified = this.pic.verified;

		return per;
	}

	/**
	 * validate, make all fields verified, just for debug purpose
	 * DO NOT USE IT IN PRODUCTION!
	 */
	public verify() {
		this.idNo.verified = true;
		this.name.verified = true;
		this.lastName.verified = true;
		this.mobile.verified = true;
		this.birthDate.verified = true;
		this.address.verified = true;
		this.pic.verified = true;

	}

	/**
	 * verified, simple getter(property) for checking all fields verified!
	 */
	public get verified() {
		return this.idNo.verified &&
			this.name.verified &&
			this.lastName.verified &&
			this.mobile.verified &&
			this.birthDate.verified &&
			this.address.verified &&
			this.pic.verified;
	}

	public storeVersion(): {
		id: number;
		idNo: number;
		name: string;
		lastName: string;
		mobile: string;
		birthDate: Date;
		address: string;
		pic: string;
		verifiedFields: Array<string>;

	} | false {
		{
			let vfs: Array<string> = [];
			this.idNo.verified &&//The same as if(this.id.verified)
				vfs.push("idNo");
			this.name.verified &&
				vfs.push("name");
			this.lastName.verified &&
				vfs.push("lastName");
			this.mobile.verified &&
				vfs.push("mobile");
			this.birthDate.verified &&
				vfs.push("birthDate");
			this.address.verified &&
				vfs.push("address");
			this.pic.verified &&
				vfs.push("pic");

			return {
				id: this.id,
				idNo: this.idNo.value,
				name: this.name.value,
				lastName: this.lastName.value,
				mobile: this.mobile.value,
				birthDate: this.birthDate.value,
				address: this.address.value,
				pic: this.pic.value,
				verifiedFields: vfs
			}
		}

	}
}
