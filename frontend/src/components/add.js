import React, { useState } from 'react'
import { Button, FormLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Add () {

  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    surname:"",
    email: "",
    contact_number:"",
    id_number:"",
    address:"",
    role:"",
    department:""
    
  })

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const addEmployee = async () => {

    await axios

    .post('http://localhost:5000/api/v1/employee/employeeData', {
      name:input.name,
      surname:input.surname,
      email:input.email,
      contact_number:input.contact_number,
      id_number:input.id_number,
      address:input.address,
      role:input.role,
      department:input.department
        
      })
      .then((res) => res.data)
  }

  const handleSubmit = (e) => {
  
    e.preventDefault()
    console.log(input)
    addEmployee().then(() => history('/employee'))
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        maxWidth={700}
        alignContent={'center'}
        alignSelf="center"
        marginLeft={'auto'}
        marginRight="auto"
        marginTop={10}
        marginBottom={10}
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={input.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
          required
        />

        <FormLabel>Surname</FormLabel>
        <TextField
          value={input.surname}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="surname"
          
        />
        <FormLabel>Email</FormLabel>
        <TextField
          value={input.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="email"
        />

        <FormLabel>Contact</FormLabel>
        <TextField
          value={input.contact_number}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="contact_number"
        />
        <FormLabel>ID Number</FormLabel>
        <TextField
          value={input.id_number}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="id_number"
        />
        <FormLabel>Address</FormLabel>
        <TextField
          value={input.address}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="address"
        />
        <FormLabel>Role</FormLabel>
        <TextField
          value={input.role}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="role"
        />
        <FormLabel>Department</FormLabel>
        <TextField
          value={input.department}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="department"
          required
        />
        <Button variant="contained" type="submit">
          ADD EMPLOYEE
        </Button>
      </Box>
    </form>
  )
}
export default Add
