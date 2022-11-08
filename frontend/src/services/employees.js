import axios from "axios";
class EmployeeDataService {

   getAll(page = 0) {
      return axios.get(`http://localhost:5000/api/v1/employee?page=${page}`)
   }
   get(id) {
      return axios.get(`http://localhost:5000/api/v1/employee/id/${id}`)
   }
   find(query, by = "Name", page = 0) {
      return axios.get(
         `http://localhost:5000/api/v1/employee?${by}=${query}&page=${page}`
      )
   }
   createEmployee(data) {
      return axios.post("http://localhost:5000/api/v1/employee/employeeData", data)
   }
   updateEmployee(data) {
      return axios.put("http://localhost:5000/api/v1/employee/employeeData", data)
   }
   deleteEmployee(id) {
      return axios.delete(
         "http://localhost:5000/api/v1/employee/employeeData",
         { data: {employeeid: id} }
      )
   }
   getDepartment() {
      return axios.get("http://localhost:5000/api/v1/employee/department")
   }
}
export default new EmployeeDataService()