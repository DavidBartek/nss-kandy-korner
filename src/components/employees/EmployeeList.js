// returns:
// 1. A button linking to HireForm.js (employees/hire)
// 2. A list of all employees
// // mapping over employees will invoke the child component "Employee" and pass all props necessary

// hooks needed:
// useState instantiating state of employees
// useEffect fetching initial state of employees (expanded to include location)
// useNavigate to navigate to hire form

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    const getAllEmployees = () => {
        fetch(`http://localhost:8088/employees?_expand=location`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
    }

    useEffect(
        () => {
            getAllEmployees()
        },
        []
    )
    
    if (!employees) {
        return null
    } else {
        return (
            <article className="employees">
                
                <h2>Team Members</h2>
    
                <button onClick={ () => {navigate("/employees/hire")}} >Add New Team Member</button>

                <div className="employees__list">
                {
                    employees.map(employee => <Employee 
                        key={`employee--${employee.id}`}
                        id={employee.id}
                        location={employee.location.address}
                        name={employee.name}
                        startDate={employee.startDate}
                        payRate={employee.payRate}
                        getAllEmployees={getAllEmployees}
                        />
                    )
                }
                </div>

            </article>
        )
    }

}