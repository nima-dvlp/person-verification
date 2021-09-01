export interface Storable {
	storeName: string;
	keyField: string;
	storeVersion(): any;
}

export interface DBResult {
	success: boolean;
	data?: any;
	event?: any;
}

class DB {
	private db: IDBDatabase;
	public get ok() {
		return this.db !== null && this.db !== undefined
	}

	private createStores(evt: any) {
		var dbi: IDBDatabase = evt.target.result;
		//console.log("Create store:", evt, dbi);
		let store = dbi.createObjectStore(
			"personApprovalStore", {
			keyPath: "id",
			autoIncrement: true
		}
		);
		store.createIndex("mobile", "mobile", {unique: true});
		store.createIndex("idNo", "idNo", {unique: true});
		store.createIndex("name", "name", {multiEntry: true});
		store.createIndex("lastName", "lastName", {multiEntry: true});
	}

	public async initDB(): Promise<DBResult> {
		if (this.ok)
			return;
		return new Promise((resolve: (e: DBResult) => void, reject: (e: DBResult) => void) => {
			let dbReq = indexedDB.open("personApproval", 1);
			dbReq.onupgradeneeded = this.createStores;
			function onOk(e: any) {
				db.db = e.target.result;
				resolve({success: true, data: db});
			}
			dbReq.onsuccess = onOk;
			function onErr(e: any) {
				reject({success: false, event: e});
			}
			dbReq.onerror = onErr;
		});
	}

	private async _insert(so: Storable): Promise<DBResult> {
		let storeVersion = so.storeVersion();
		//This will cause an error while the id field is null
		delete storeVersion.id;
		try {
			return new Promise((resolve: (e: DBResult) => void, reject: (e: DBResult) => void) => {
				let addOp = this.db.transaction(so.storeName, "readwrite")
					.objectStore(so.storeName)
					.add(storeVersion);
				function onOk(e: any) {
					resolve({success: true, data: e.target.result});
				}
				function onError(e: any) {
					reject({success: false, event: e});
				}
				addOp.onerror = onError;
				addOp.onsuccess = onOk;
			});
		} catch (e: any) {
			console.log("Handeled");
			return e
		}
	}

	//Calling _insert to handle throws
	public async insert(so: Storable): Promise<DBResult> {
		await this.initDB();
		try {
			return await this._insert(so);
		} catch (e: any) {
			return e;
		}
	}

	public async list(storeName: string): Promise<DBResult> {
		await this.initDB();
		return new Promise((resolve: (e: DBResult) => void, reject: (e: DBResult) => void) => {
			let listReq = this.db.transaction(storeName, "readonly")
				.objectStore(storeName)
				.getAll();
			function onOk(e: any) {
				resolve({success: true, data: e.target.result});
			}
			function onError(e: any) {
				reject({success: false, data: e.target.result});
			}
			listReq.onsuccess = onOk;
			listReq.onerror = onError;
		});
	}

	public async delete(so: Storable): Promise<DBResult> {
		await this.initDB();
		return new Promise((resolve: (e: DBResult) => void, reject: (e: DBResult) => void) => {
			let dlRq = this.db.transaction(so.storeName, "readwrite")
				.objectStore(so.storeName)
				.delete(so.storeVersion()[so.keyField]);
			function onOk(e: any) {
				resolve({success: true, data: e.target.result});
			}
			function onError(e: any) {
				reject({success: false, event: e});
			}
			dlRq.onerror = onError;
			dlRq.onsuccess = onOk;
		});
	}

	public async update(so: Storable): Promise<DBResult> {
		await this.initDB();
		let storeVersion = so.storeVersion();
		return new Promise((resolve: (e: DBResult) => void, reject: (e: DBResult) => void) => {
			let upRq = this.db.transaction(so.storeName, "readwrite")
				.objectStore(so.storeName)
				.put(storeVersion);
			function onOk(e: any) {
				resolve({success: true, data: e.target.result});
			}
			function onError(e: any) {
				reject({success: false, event: e});
			}
			upRq.onerror = onError;
			upRq.onsuccess = onOk;
		});
	}

}
var db: DB = new DB();

export default db;
