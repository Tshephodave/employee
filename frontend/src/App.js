import React from 'react'
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button'

import AddEmployee from "./components/add"
import EmployeeList from "./components/employee-list"
import Employee from "./components/employee"
import Login from "./components/login"

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function App() {
  const [user, setUser] = React.useState(null)
  async function login(user = null) {// default user to null
    setUser(user)
  }
  async function logout() {
    setUser(null)
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        
        <Navbar.Brand>Employees Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link >
              <Link to={"/employee"}>
                <Button variant="primary">Employees</Button>
                </Link>
            </Nav.Link>
            <Nav.Link> {user ? (
              <a onClick={logout}>Logout User</a>
            ) : (
              <Link to={"/login"}>
                <Button variant="primary">Login</Button>
                </Link>
            )}
            </Nav.Link>
            <Nav.Link>
           <Link to={"/employeeData"}>
                    <Button variant="primary">Add Employee</Button>
                  </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/employee"]} component={EmployeeList}>
        </Route>
        <Route exact path={"/employeeData"} component={AddEmployee}>  
        </Route>
        <Route path="/employee/:id/employeeData" render={(props) =>
          <AddEmployee {...props} user={user} />
        }>
        </Route>
        <Route path="/employee/:id" render={(props) =>
          <Employee {...props} user={user} />
        }>
        </Route>
        <Route path="/login" render={(props) =>
          <Login {...props} login={login} />
        }>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
