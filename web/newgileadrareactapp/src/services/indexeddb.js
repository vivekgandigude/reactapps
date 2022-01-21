import Dexie from "dexie";

const db = new Dexie("SalesDatabase");
db.version(6).stores({ salesdb: "ID,Title,field_1,field_2,field_3" });

export default db;
