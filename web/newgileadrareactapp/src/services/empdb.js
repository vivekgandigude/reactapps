import Dexie from "dexie";

const empdb = new Dexie("EmpDB");
empdb.version(6).stores({
  dataset: "emp_no,first_name,last_name,HireDate,birth_date,gender,hire_date",
});

export default empdb;
