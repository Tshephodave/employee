import { Box, Button, FormLabel, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useHistory, useParams } from 'react-router-dom'


const Employee = () => {
  const [inputs, setInputs] = useState()
  const id = useParams().id
  const history = useHistory()

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/api/v1/employee/id/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data))
    }
    fetchHandler()
  }, [id])

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/api/v1/employeeData/id/${id}`,{
        
        name:inputs.name,
        surname:inputs.surname,
        email:inputs.email,
        contact_number:inputs.contact_number,
        id_number:inputs.id_number,
        address:inputs.address,
        role:inputs.role,
        department:inputs.department
      })
      .then((res) => res.data)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequest().then(() => history('/employee'))
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div>
      {inputs && (
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
              value={inputs.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
              required
            />

            <FormLabel>Surname</FormLabel>
            <TextField
              value={inputs.surname}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="surname"
            />
            <FormLabel>Email</FormLabel>
            <TextField
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="email"
            />

            <FormLabel>Contact</FormLabel>
            <TextField
              value={inputs.contact_number}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="contact_number"
            />
            <FormLabel>ID Number</FormLabel>
            <TextField
              value={inputs.id_number}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="id_number"
            />
            <FormLabel>Address</FormLabel>
            <TextField
              value={inputs.address}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="address"
            />
            <FormLabel>Role</FormLabel>
            <TextField
              value={inputs.role}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="role"
            />
            <FormLabel>Department</FormLabel>
            <TextField
              value={inputs.department}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="department"
              required
            />

            <Button variant="contained" onClick={sendRequest} type="submit">
              Update Employee
            </Button>
            <div>
                <p className="click"></p>
              </div>
              
            <Button   variant="contained" color="primary" marginTop={'auto'}>
              Delete Employee
            </Button>
          </Box>
        </form>
      )}
    </div>
  )
}
export default Employee
