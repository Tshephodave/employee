import { Button } from '@mui/material'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const Employee = (props) => {
  const history = useHistory()
  const {
    employeeid,
    name,
    surname,
    email,
    contact_number,
    id_number,
    address,
    role,
    department

  } = props.data

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/v1/employee/employeeData/${employeeid}`)
      .then((res) => res.data)
      .then(() => history('/'))
      .then(() => history('/employee'))
  }
//<>Rs {em
 
  return (
    <div className="card">
  
      <article>By {name}</article>
      <h3>{name}</h3>
      <p>{surname}</p>
      <h3>{email}</h3>
      <h3>{contact_number}</h3>
      <h3>{id_number}</h3>
      <h3>{address}</h3>
      <h3>{role}</h3>
      <h3>{department}</h3>
      <Button color="error" onClick={deleteHandler} sx={{ mt: 'auto' }}>
        Delete
      </Button>
    </div>
  )
}

export default Employee
