import axios from "axios";
import axoispkg from "axios";
import pkg from "qs";
import mysqldataacess from "../dataacess/mysqldataaccess.js";

const { stringify } = pkg;
const { defaults, post, get } = axoispkg;

class EmployeesController {
  getEmployees = async (request, response, next) => {
    mysqldataacess.getEmployees().then((result2) => {
      response.status(200).json(result2);
    });
  };
  getAllEmployees = async (request, response, next) => {
    mysqldataacess.getAllEmployees(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
  getAllEmployeesBySorting = async (request, response, next) => {
    mysqldataacess.getAllEmployeesBySorting(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
  getAllEmployeesBySortWithFilter = async (request, response, next) => {
    mysqldataacess.getAllEmployeesBySortWithFilter(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
  getFilms = async (request, response, next) => {
    mysqldataacess.getFilms().then((result2) => {
      response.status(200).json(result2);
    });
  };
  getEmployeeDetails = async (request, response, next) => {
    mysqldataacess.getEmployeeDetails(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
  saveEmployee = async (request, response, next) => {
    mysqldataacess.saveEmployee(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
  updateEmployee = async (request, response, next) => {
    mysqldataacess.updateEmployee(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
  deleteEmployee = async (request, response, next) => {
    mysqldataacess.deleteEmployee(request).then((result2) => {
      response.status(200).json(result2);
    });
  };
}
const employeesController = new EmployeesController();

export default employeesController;
