import '@testing-library/jest-dom';
import db from './db';
import {Person} from '../types/person';

//it.skip("Test indexedDB", (done: any) => {
//	const testCount = 3;
//
//	let insertSuccessCount = 0;
//	let errorCount = 0;
//
//	let insertSuccess = (_e: any) => {
//		insertSuccessCount++;
//		if (insertSuccessCount + errorCount === testCount)
//			testDone();
//	}
//	let onErr = (_e: any) => {
//		errorCount++;
//		if (insertSuccessCount + errorCount === testCount)
//			testDone();
//	}
//
//	let testDone = () => {
//		expect(insertSuccessCount).toBe(2);
//		expect(errorCount).toBe(1);
//		done();
//	}
//
//	db.addConnectListener(() => {
//
//		let person = new Person(null, 4321, "Nima", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");
//		let person2 = new Person(null, 4322, "Nima", "Zare", "0917xXx2002", new Date("11/25/1985"), "SYZ", "BASE64PIC");
//		//This will store the person
//		db.insert({
//			store: person,
//			onsuccess: insertSuccess,
//			onerror: onErr
//		});
//		//This will raise an error due to idNo and mobile duplication!
//		db.insert({
//			store: person,
//			onsuccess: insertSuccess,
//			onerror: onErr
//		});
//		//This will store the person
//		db.insert({
//			store: person2,
//			onsuccess: insertSuccess,
//			onerror: onErr
//		});
//
//		//BEFORE ATTEMPT TO ADD MORE TEST(S) PLEASE UPDATE testCount in top of this test fn
//	})
//})
//

it("Test indexedDB", async () => {
	await db.initDB();
	let person = new Person(null, 4321, "Nima", "Zare", "0917xXx2001", new Date("11/25/1985"), "SYZ", "BASE64PIC");
	let person2 = new Person(null, 4322, "Nima", "Zare", "0917xXx2002", new Date("11/25/1985"), "SYZ", "BASE64PIC");
	//This will store the person
	let insert = await db.insert(person);
	expect(insert).toStrictEqual({success: true, data: 1});
	//This will raise an error due to idNo and mobile duplication!
	insert = await db.insert(person);
	expect(insert.success).toBe(false);
	//This will store the person
	insert = await db.insert(person2);
	expect(insert).toStrictEqual({success: true, data: 2});

	let list = await db.list("personApprovalStore");
	expect(list.success).toBe(true);
	expect(list.data.length).toBe(2);

	expect(true).toBe(true);
})

