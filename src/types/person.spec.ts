import {Person} from "./person"

it("Test Person.new", async () => {
	let person = Person.new();

	expect(person.storeVersion()).toStrictEqual({
		id: null,
		idNo: null,
		birthDate: null,
		name: "",
		lastName: "",
		address: "",
		mobile: "",
		pic: "",
		verifiedFields: [],
	});
})

it("Test Person.new", async () => {
	let person = new Person(123, 1234, "Nima", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");

	expect(person.verified).toBe(false);
	expect(person.storeVersion()).toStrictEqual({
		id: 123,
		idNo: 1234,
		birthDate: new Date('11/25/1985'),
		name: "Nima",
		lastName: "Zare",
		address: "SYZ",
		mobile: "0917xXx2001",
		pic: "BASE64PIC",
		verifiedFields: [],
	});
})

it("Test Person.verified", async () => {
	let person = new Person(123, 1234, "Nima", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");
	person.verify();

	expect(person.verified).toBe(true);
	expect(person.storeVersion()).toStrictEqual({
		id: 123,
		idNo: 1234,
		birthDate: new Date('11/25/1985'),
		name: "Nima",
		lastName: "Zare",
		address: "SYZ",
		mobile: "0917xXx2001",
		pic: "BASE64PIC",
		verifiedFields: ["idNo", "name", "lastName", "mobile", "birthDate", "address", "pic"],
	});

	person.idNo.verified = false;

	expect(person.verified).toBe(false);
})

it("Test Person.clone", async () => {
	let person = new Person(123, 1234, "Nima", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");

	let cloned = person.clone();

	expect(cloned.storeVersion()).toStrictEqual({
		id: 123,
		idNo: 1234,
		birthDate: new Date('11/25/1985'),
		name: "Nima",
		lastName: "Zare",
		address: "SYZ",
		mobile: "0917xXx2001",
		pic: "BASE64PIC",
		verifiedFields: [],
	});


	cloned.name.value = "MaMrEzO";
	cloned.verify();

	expect(cloned.storeVersion()).toStrictEqual({
		id: 123,
		idNo: 1234,
		birthDate: new Date('11/25/1985'),
		name: "MaMrEzO",
		lastName: "Zare",
		address: "SYZ",
		mobile: "0917xXx2001",
		pic: "BASE64PIC",
		verifiedFields: ["idNo", "name", "lastName", "mobile", "birthDate", "address", "pic"],
	});

	expect(person.storeVersion()).toStrictEqual({
		id: 123,
		idNo: 1234,
		birthDate: new Date('11/25/1985'),
		name: "Nima",
		lastName: "Zare",
		address: "SYZ",
		mobile: "0917xXx2001",
		pic: "BASE64PIC",
		verifiedFields: [],
	});
})
