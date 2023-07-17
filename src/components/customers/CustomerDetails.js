// grabs parameter passed to the url via useParams() - this will specify which customer details to display, by their id
// useState to instantiate customer state
// useEffect with specified url to grab customer info (customerId=x)
// render customer's name, email, loyalty #

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {

    const {customerId} = useParams()
    console.log(customerId)

    const [customer, setCustomer] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?id=${customerId}`)
                .then(res => res.json())
                .then((customerData) => {
                    console.log(customerData[0])
                    const indivCustomer = customerData[0]
                    setCustomer(indivCustomer)
                })
        },
        [customerId]

    )

    if (!customer) {
        return null       
    } else {
        return (
            <section className="customer">
                <header className="customer__header">{customer.name}</header>
                <div className="customer__email">Email: {customer.email}</div>
                <div className="customer__loyalty">Loyalty #: {customer.loyaltyNumber}</div>
            </section>
        )
    }

}