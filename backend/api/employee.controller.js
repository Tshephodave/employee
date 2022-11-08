import EmployeeDAO from '../dao/employeeDAO.js'

export default class EmployeeController{
 static async apiGetAllEmployees(req,res,next){
 const employeePerPage = req.query.employeePerPage ?
parseInt(req.query.employeePerPage) : 15
 const page = req.query.page ? parseInt(req.query.page) : 0
 let filters = {}
 if(req.query.department){ 
 filters.department = req.query.department
 }
 else if(req.query.name){ 
 filters.name = req.query.name 
 }
 const { employeeList, totalNumemployee } = await
   EmployeeDAO.GetAllEmployees({filters, page, employeePerPage})
 let response ={
 employee: employeeList,
 page: page,
 filters: filters,
 entries_per_page: employeePerPage,
 total_results: totalNumemployee,
 }
 res.json(response)
 }
 
    static async apiGetDepartment(req,res,next){
      try{
      let propertyTypes = await EmployeeDAO.getDepartment()
      res.json(propertyTypes)
      }
      catch(e){
      console.log(`api,${e}`)
      res.status(500).json({error: e})
      }
      }
      static async apiPostEmployee(req,res,next){
        try{
        const name = req.body.name
        const surname= req.body.surname
        const email = req.body.email
        const contact_number= req.body.contact_number
        const id_number = req.body.id_number
        const address= req.body.address
        const role = req.body.role
        const department= req.body.department
       
        const Response = await EmployeeDAO.addEmployee(
         name,
         surname,
         email,
         contact_number,
         id_number,
         address,
         role,
         department
         
        
        
        
        )
        res.json({ status: "success "})
        }catch(e){
        res.status(500).json({ error: e.message})
        }
        }
        static async apiUpdateEmployee(req,res,next){
          try{
            const employeeid = req.body.employeeid
            const name = req.body.name
           const surname= req.body.surname
           const email = req.body.email
           const contact_number= req.body.contact_number
           const id_number = req.body.id_number
           const address= req.body.address
           const role = req.body.role
           const department= req.body.department

          
          const updateResponse = await EmployeeDAO.updateEmployee(
          employeeid,
          
         name,
         surname,
         email,
         contact_number,
         id_number,
         address,
         role,
         department

          )
          var { error } = updateResponse
          if(error){
          res.status.json({error})
          }
          if(updateResponse.modifiedCount === 0){
          throw new Error ("unable to update employee. User may not be original poster")
          }
          res.json({ status: "success "})
          }catch(e){
          res.status(500).json({ error: e.message})
          }
          }
          static async apiDeleteEmployee(req,res,next){
            try{
              const employeeid = req.body.employeeid
              
            
            const EmployeeResponse = await EmployeeDAO.deleteEmployee(
              employeeid,
               
            
            )
            
            res.json({ status: "success "})
            }catch(e){
            res.status(500).json({ error: e.message})
            }
            }
            static async apiGetEmployeeById(req,res, next){
              try{
              let id = req.params.id || {}
              let employee = await EmployeeDAO.getEmployeeById(id)
              if(!employee){
                res.status(404).json({ error: "not found"})
                return
                }
                res.json(employee)
                }
                catch(e){
                console.log(`api, ${e}`)
                res.status(500).json({error: e})
                }
                }
       }
     
     
 

