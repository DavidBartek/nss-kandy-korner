// returns a list of all employees
// // mapping over customers will invoke the child component "Customer" and pass all props necessary - will need id, name, email

// hooks needed:
// useState instantiating state of employees
// useEffect fetching initial state of employees (expanded to include location)
// useNavigate to navigate to hire form

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )
    
    if (!customers) {
        return null
    } else {
        return (
            <article className="customers">
                
                <h2>Our Beloved Customers</h2>

                <div className="customers__list">
                {
                    customers.map(customer => <Customer 
                        key={`employee--${customer.id}`}
                        id={customer.id}
                        name={customer.name}
                        email={customer.email}
                        />
                    )
                }
                </div>

            </article>
        )
    }
}