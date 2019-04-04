import axios from "axios";

export default {
  // Gets employee from database
  getEmployees: function (q) {
    return axios.get("/api/employee");
  },
  // Gets all saved employee
  updateEmployee: function (id, data) {
    return axios.put(`/api/employee/${id}`, data);
  },
  // Deletes the saved employee with the given id
  deleteEmployee: function (id) {
    return axios.delete("/api/employee/" + id);
  },
  // Saves an Employee to the database
  addEmployee: function (employeeData) {
    return axios.post("/api/employee", employeeData);
  }
};