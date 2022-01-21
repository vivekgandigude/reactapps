import pkg from "express";
const { Router } = pkg;
import employeesController from "./controller/employeecontroller.js"
import splistController from "./controller/splistController.js"

const router = Router();
router.get("/api/getEmployees", employeesController.getEmployees);
router.get("/api/getAllEmployees", employeesController.getAllEmployees);
router.get("/api/getAllEmployeesBySorting", employeesController.getAllEmployeesBySorting);
router.get("/api/getAllEmployeesBySortWithFilter", employeesController.getAllEmployeesBySortWithFilter);
router.get("/api/getFilms", employeesController.getFilms);
router.get("/api/getEmployeeDetails", employeesController.getEmployeeDetails);
router.post("/api/saveEmployee", employeesController.saveEmployee);
router.post("/api/updateEmployee", employeesController.updateEmployee);
router.delete("/api/deleteEmployee", employeesController.deleteEmployee);

router.get("/api/getAllTestListItems", splistController.getAllTestListItems);
router.get("/api/getAllTestListItems", splistController.getAllTestListItems);
router.get("/api/getNextListItems", splistController.getNextListItems);
router.get("/api/getListItemCount", splistController.getListItemCount);
router.post("/api/createListItem", splistController.createListItem);
router.post("/api/updateListItem", splistController.updateListItem);
router.delete("/api/deleteListItem", splistController.deleteListItem);
export default router;