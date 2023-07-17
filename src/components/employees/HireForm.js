// form for hiring employees
// required info for user to provide: name (string) location (foreign key, selectable) start date (date) pay rate (number)

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// when saved, redirect user to /employee (useNavigate())

// returns:
// form inputs to spec
// button to submit new employee info (POST); also navigates user back to /employees

// hooks needed:
// useState defining initial state of a new employee object

// handleSaveButtonClick function containing API POST x2 and navigate

// 2 POST requests required, chained by .then():
// 1. create object in users
// 2. create object in employees with a userId, captured from the response of #1

export const HireForm = () => {

    const navigate = useNavigate()

    const [newEmployeeObj, modifyNewEmployee] = useState({
        // these properties will be posted to users
        name: "",
        email: "", 
        // these properties will be posted to employees (in addition to above)
        locationId: null,
        startDate: "",
        payRate: null

    })

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/locations')
                .then(res => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const newUserToAPI = {
            name: newEmployeeObj.name,
            email: newEmployeeObj.email,
            isStaff: true
        }

        const newEmployeeToAPI = {
            name: newEmployeeObj.name,
            email: newEmployeeObj.email,
            locationId: newEmployeeObj.locationId,
            startDate: newEmployeeObj.startDate,
            payRate: newEmployeeObj.payRate
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserToAPI)
        })
            .then(res => res.json())
            .then(res => newEmployeeToAPI.userId = res.id)
            .then(() => {
                return fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEmployeeToAPI)
                })
            })
            .then(res => res.json())
            .then(() => {
                navigate("/employees")
            })
    }    
    
    if (!locations) {
        return null
    } else {
        return (
            <form className="newHireForm" onSubmit={(e) => handleSaveButtonClick(e)}>
                <h2>Hire a Team Member</h2>
                <fieldset className="form-group">
                    <label htmlFor="name">New employee's name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="type name here"
                        value={newEmployeeObj.name}
                        onChange={
                            (e) => {
                                const copy = {...newEmployeeObj}
                                copy.name = e.target.value
                                modifyNewEmployee(copy)
                            }
                        }    
                    />
                </fieldset>
    
                <fieldset className="form-group">
                    <label htmlFor="email">New employee's email:</label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        placeholder="type email here"
                        value={newEmployeeObj.email}
                        onChange={
                            (e) => {
                                const copy = {...newEmployeeObj}
                                copy.email = e.target.value
                                modifyNewEmployee(copy)
                            }
                        }    
                    />
    
                </fieldset>
    
                <fieldset className="form-group">
                    <label htmlFor="location">Location: </label>
                    <select
                        required
                        onChange={
                            (e) => {
                                const copy = {...newEmployeeObj}
                                copy.locationId = e.target.value
                                modifyNewEmployee(copy)
                            }
                        }>
    
                        <option value="">Select location</option>
                        {locations.map((location) => {
                            return <option key={location.id} value={location.id}>
                                {location.address}
                            </option>
                        })}
                    </select>
                </fieldset>
    
                <fieldset className="form-group">
                    <label htmlFor="startDate">New employee's start date </label>
                    <input
                        required
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={newEmployeeObj.startDate}
                        onChange={
                            (e) => {
                                const copy = {...newEmployeeObj}
                                copy.startDate = e.target.value
                                modifyNewEmployee(copy)
                            }
                        }
                    />
                </fieldset>
    
                <fieldset className="form-group">
                    <label htmlFor="rate">Hourly rate: $ </label>
                    <input
                        required
                        type="number"
                        min="18.00"
                        max="30.00"
                        step="1"
                        value={newEmployeeObj.payRate}
                        onChange={
                            (e) => {
                                const copy = {...newEmployeeObj}
                                copy.payRate = e.target.value
                                modifyNewEmployee(copy)
                            }
                        } />
                </fieldset>
    
                <button
                    type="submit"
                    className="productForm__button">
                    Add Team Member
                </button>
            </form>
        )
    }
}
