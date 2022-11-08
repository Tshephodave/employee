
import React, { useState, useEffect } from 'react'
import EmployeeDataService from "../services/employees"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const EmployeeList = props => {

    const [employee, setEmployee] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchDepartment, setSearchDepartment] = useState("")
    const [department, setDepartment] = useState(["All Departments"])
    const [currentPage, setCurrentPage] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(0)
    const [currentSearchMode, setCurrentSearchMode] = useState("")
    useEffect(() => {
        setCurrentPage(0)
    }, [currentSearchMode])
    useEffect(() => {
        retrieveEmployees()
        retrieveDepartments()
    }, [])
    useEffect(() => {

        retrieveNextPage()
    }, [currentPage])

    const retrieveNextPage = () => {
        if (currentSearchMode === "findByName")
            findByName()
        else if (currentSearchMode === "findByDepartment")
            findByDepartment()
        else
            retrieveEmployees()
    }

    const retrieveEmployees = () => {
        setCurrentSearchMode("")
        EmployeeDataService.getAll(currentPage)
            .then(response => {
                console.log(response.data)
                setEmployee(response.data.employee)
                setCurrentPage(response.data.page)
                setEntriesPerPage(response.data.entries_per_page)
            })
            .catch(e => {
                console.log(e)
            })
    }
    const retrieveDepartments = () => {
        EmployeeDataService.getDepartment()
            .then(response => {
                console.log(response.data)
                //start with 'All Departments' if user doesn't specify any department
                setDepartment(["All Departments"].concat(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }
    const find = (query, by) => {
        EmployeeDataService.find(query, by, currentPage)
            .then(response => {
                console.log(response.data)
                setEmployee(response.data.employee)
            })
            .catch(e => {
                console.log(e)
            })
    }
    const findByName = () => {
        setCurrentSearchMode("findByName")
        find(searchName, "name")
    }
    const findByDepartment = () => {
        setCurrentSearchMode("findByDepartment")
        if (searchDepartment === "All Departments") {
            retrieveEmployees()
        }
        else {
            find(searchDepartment, "department")
        }
    }
    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName);
    }
    const onChangeSearchDepartment = e => {
        const searchDepartment = e.target.value
        setSearchDepartment(searchDepartment);
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchName}
                                    onChange={onChangeSearchName}
                                />
                                <div>
                <p className="click"></p>
              </div>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByName}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchDepartment} >
                                    {department.map(department => {
                                        return (
                                            <option value={department}>{department}</option>
                                        )
                                    })}
                                </Form.Control>
                                <div>
                <p className="click"></p>
              </div>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByDepartment}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                <div>
                <p className="click"></p>
              </div>
                   
                    {employee.map((employee) => {
                        return (
                            <Col>
                                <Card style={{ width: '75rem' }}>

                                    <Card.Body>
                                        <Card.Title>{employee.name}</Card.Title>
                                        <Card.Text>
                                            Department: {employee.department}

                                        </Card.Text>
                                        <Card.Text>

                                            EmployeeRole: {employee.role}
                                        </Card.Text>

                                        <Link to={"/employee/" + employee._id} >Viem Employee</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <br />
                Showing page: {currentPage}.
                <Button
                    variant="link"
                    onClick={() => { setCurrentPage(currentPage + 1) }}
                >
                    Get next {entriesPerPage} results
                </Button>
            </Container>
        </div>
    );
}
export default EmployeeList;