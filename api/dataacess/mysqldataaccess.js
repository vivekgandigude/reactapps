import mySqlcon from "../connection/mysqlconnection.js";
class MySqlDataAccess {
  getEmployees = async () =>
    new Promise(async (resolve, reject) => {
      try {
        mySqlcon.query(
          'SELECT *, DATE_FORMAT(hire_date, "%m-%d-%Y") as HireDate FROM employees ORDER BY emp_no DESC LIMIT 20000 ',
          (err, result) => {
            if (err) {
              console.log(err);
            }
            resolve(result);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  getAllEmployees = async (request) =>
    new Promise(async (resolve, reject) => {
      try {
        const limit = request.query.limit;
        // page number
        const page = request.query.page;
        // calculate offset
        const offset = (page - 1) * limit;
        console.log(limit, page);
        mySqlcon.query(
          'SELECT *, DATE_FORMAT(hire_date, "%m-%d-%Y") as HireDate FROM employees ORDER BY emp_no DESC limit ' +
            limit +
            " OFFSET " +
            offset,

          (err, result) => {
            if (err) {
              console.log(err);
            }
            resolve(result);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  getAllEmployeesBySorting = async (request) =>
    new Promise(async (resolve, reject) => {
      try {
        const limit = request.query.limit;
        // page number
        const page = request.query.page;
        // calculate offset
        const offset = (page - 1) * limit;
        const sortColumn = request.query.column;
        const sortOrder = request.query.order;
        console.log(limit, page);
        const query =
          'SELECT *, DATE_FORMAT(hire_date, "%m-%d-%Y") as HireDate FROM employees ORDER BY ' +
          sortColumn +
          " " +
          sortOrder +
          " limit " +
          limit +
          " OFFSET " +
          offset;
        console.log(query);
        mySqlcon.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  getAllEmployeesBySortWithFilter = async (request) =>
    new Promise(async (resolve, reject) => {
      try {
        const limit = request.query.limit;
        // page number
        const page = request.query.page;
        // calculate offset
        const offset = (page - 1) * limit;
        const sortColumn = request.query.column;
        const sortOrder = request.query.order;
        const filterColumn = request.query.filterColumn;
        const filterText = request.query.filterText;

        const query =
          "SELECT *, DATE_FORMAT(hire_date, '%m-%d-%Y') as HireDate FROM employees.employees  WHERE  LOCATE('" +
          filterText +
          "', last_name) > 0 OR  LOCATE('" +
          filterText +
          "', first_name) > 0" +
          " OR LOCATE('" +
          filterText +
          "', birth_date) > 0 OR  LOCATE('" +
          filterText +
          "', hire_date) > 0 " +
          "ORDER By " +
          sortColumn +
          " " +
          sortOrder +
          " limit " +
          "" +
          limit +
          " OFFSET " +
          offset;
        // "SELECT *, DATE_FORMAT(hire_date, '%m-%d-%Y') as HireDate FROM employees.employees" +
        // " WHERE  LOCATE('" +
        // filterText +
        // "', " +
        // filterColumn +
        // ") > 0 ORDER By " +
        // sortColumn +
        // " " +
        // sortOrder +
        // " limit " +
        // limit +
        // " OFFSET " +
        // offset;

        console.log(query);
        mySqlcon.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  getFilms = async () =>
    new Promise(async (resolve, reject) => {
      try {
        mySqlcon.query("SELECT * FROM sakila.film", (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  getEmployeeDetails = async (request) =>
    new Promise(async (resolve, reject) => {
      try {
        console.log(request.query.id);
        mySqlcon.query(
          'SELECT *, DATE_FORMAT(hire_date, "%m/%d/%Y") as HireDate FROM employees WHERE emp_no=' +
            request.query.id,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            resolve(result);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  saveEmployee = (request) =>
    new Promise(async (resolve, reject) => {
      console.log(request.body);

      try {
        var query =
          "INSERT INTO employees.employees (emp_no,first_name,last_name,hire_date,birth_date,gender) VALUES ('" +
          request.body.empno +
          "','" +
          request.body.firstname +
          "','" +
          request.body.lastname +
          "','" +
          request.body.hireDate +
          "','" +
          request.body.dob +
          "','" +
          request.body.gender +
          "')";
        console.log(query);
        mySqlcon.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  updateEmployee = (request) =>
    new Promise(async (resolve, reject) => {
      console.log(request.body);
      try {
        var query =
          "Update employees.employees SET first_name ='" +
          request.body.firstname +
          "',last_Name='" +
          request.body.lastname +
          "' WHERE emp_no=" +
          request.body.empno;
        console.log(query);
        mySqlcon.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  deleteEmployee = (request) =>
    new Promise(async (resolve, reject) => {
      console.log(request.body);
      try {
        var query =
          "Delete FROM  employees.employees WHERE emp_no=" + request.query.id;
        console.log(query);
        mySqlcon.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
}
const mysqldataacess = new MySqlDataAccess();
export default mysqldataacess;
