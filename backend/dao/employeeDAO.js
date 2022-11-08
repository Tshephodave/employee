import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let employee
export default class EmployeeDAO {
  static async injectDB(conn) {
    if (employee) {
      return
    }
    try {
      employee = await conn.db(process.env.EMPLOYEE_NS)
        .collection('employee')
    }
    catch (e) {
      console.error(`unable to connect in employeeDAO: ${e}`)
    }
  }
  static async GetAllEmployees
    ({// default filter
      filters = null,
      page = 0,
      employeePerPage = 15, // will only get 15 employees at once
    } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters['name'] } }
      } else if ("department" in filters) {
        query = { "department": { $eq: filters['department'] } }
      }
    }
    let cursor
    try {
      cursor = await employee
        .find(query)
        .limit(employeePerPage)
        .skip(employeePerPage * page)
      const employeeList = await cursor.toArray()
      const totalNumemployee = await employee.countDocuments(query)
      return { employeeList, totalNumemployee }
    }
    catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { employeeList: [], totalNumemployee: 0 }
    }
  }
  static async getDepartment() {
    let department = []
    try {
      department = await employee.distinct("department")
      return department
    }
    catch (e) {
      console.error(`unable to get Department, $(e)`)
      return department
    }
  }

  static async addEmployee(name, surname, email, contact_number, id_number, address, role, department) {
    try {
      const employeeDoc = {
        
        name:name,
        surname:surname,
        email:email,
        contact_number:contact_number,
        id_number:id_number,
        address:address,
        role:role,
        department:department

      }
      return await employee.insertOne(employeeDoc)
    }
    catch (e) {
      console.error(`unable to add employee: ${e}`)
      return { error: e }
    }
  }
  static async updateEmployee(employeeid,name,surname,email,contact_number,id_number,address,role,department) {
    try {
      const updateResponse = await employee.updateOne(
        { _id: ObjectId(employeeid) },
        { $set: { name:name,surname:surname,email,email,contact_number:contact_number,id_number:id_number,address:address,role:role,department:department } }
      )
      return updateResponse
    }
    catch (e) {
      console.error(`unable to update employee: ${e}`)
      return { error: e }
    }
  }
  static async getEmployeeById(id) {
    try {
      return await employee.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          }
        },

      ]).next()
    }
    catch (e) {
      console.error(`something went wrong in getEmployeeById: ${e}`)
      throw e
    }
  }
  static async deleteEmployee(employeeid) {
    try {
      const deleteResponse = await employee.deleteOne({
        _id: ObjectId(employeeid),
        

      })
      return deleteResponse
    }
    catch (e) {
      console.error(`unable to delete employee: ${e}`)
      return { error: e }
    }
  }

}








