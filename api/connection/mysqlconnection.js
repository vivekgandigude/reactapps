import mySqlConfig from "../config/mysqlconfig.js";
import mysql2 from "mysql2";

const mySqlcon = mysql2.createConnection({
  host: mySqlConfig.host,
  user: mySqlConfig.USER,
  password: mySqlConfig.PASSWORD,
  database: mySqlConfig.DB,
});

export default mySqlcon;
