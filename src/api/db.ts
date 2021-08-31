export interface Storable {
	storeName: string;
	keyField: string;
	storeVersion(): any;
}

export interface StorableOperation<T extends Storable> {
	store: T;
	onerror: (e: any) => void;
	onsuccess: (e: any) => void;
}

class DB {
	private db: IDBDatabase;

	private connectListeners: Array<() => void> = [];

	constructor() {
		this.initDB();
	}

	public addConnectListener(listener: () => void) {
		this.connectListeners.push(listener);
	}

	private dbOpenSuccess(e: any) {
		db.db = e.target.result;
		db.connectListeners.forEach(cl => cl());
		console.log(db);
	}

	private createStores(evt: any) {
		var dbi: IDBDatabase = evt.target.result;
		console.log("Create store:", evt, dbi);
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

	private dbOpenError(e: any) {
		console.log("DB init failed: ", e);
	}

	private initDB() {
		let dbReq = indexedDB.open("personApproval", 1);
		dbReq.onupgradeneeded = this.createStores;
		dbReq.onsuccess = this.dbOpenSuccess;
		dbReq.onerror = this.dbOpenError;
	}

	public insert<T extends Storable>(so: StorableOperation<T>) {
		let storeVersion = so.store.storeVersion();
		delete storeVersion.id;
		console.log("Inserting:", storeVersion);
		let addOp = this.db.transaction(so.store.storeName, "readwrite")
			.objectStore(so.store.storeName)
			.add(storeVersion);
		addOp.onerror = so.onerror;
		addOp.onsuccess = so.onsuccess;
	}

	public list(storeName: string, handler: (e: any) => void) {
		this.db.transaction(storeName, "readonly")
			.objectStore(storeName)
			.getAll().onsuccess = handler;
	}

	public delete<T extends Storable>(so: StorableOperation<T>) {
		let dlRq = this.db.transaction(so.store.storeName, "readwrite")
			.objectStore(so.store.storeName)
			.delete(so.store.storeVersion()[so.store.keyField]);
		dlRq.onsuccess = so.onsuccess;
		dlRq.onerror = so.onerror;
	}

	public update<T extends Storable>(so: StorableOperation<T>) {
		let storeVersion = so.store.storeVersion();
		console.log("Updateing storeVersion: ", storeVersion);
		let upRq = this.db.transaction(so.store.storeName, "readwrite")
			.objectStore(so.store.storeName)
			.put(storeVersion);
		upRq.onerror = so.onerror;
		upRq.onsuccess = so.onsuccess;
	}

}
var db: DB = new DB();

export default db;
