// grabs parameter passed to the url via useParams() - this will specify which customer details to display, by their id
// useState to instantiate customer state
// useEffect with specified url to grab customer info (customerId=x)
// render customer's name, email, loyalty #

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerDetails = () => {

    const {customerId} = useParams()
    // console.log(customerId)
    const navigate = useNavigate()

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        loyaltyNumber: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?id=${customerId}`)
                .then(res => res.json())
                .then((customerData) => {
                    // console.log(customerData[0])
                    const indivCustomer = customerData[0]
                    setCustomer(indivCustomer)
                })
        },
        [customerId]
    )

    const handleSaveButton = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(() => {
                window.alert("loyalty ID updated")
            })

    }

    const goBack = () => {
        navigate("/customers")
    }

    if (!customer) {
        return null       
    } else {
        return (
            <>
                <section className="customer">
                    <h3 className="customer__header">{customer.name}</h3>
                    <div className="customer__email">Email: {customer.email}</div>
                </section>
                <section>
                    
                    <form className="loyalty__form" onSubmit={(e) => handleSaveButton(e)}>
                        <fieldset className="form-group">
                            <label>Change loyalty ID: </label>
                            <input
                                required
                                type="number"
                                min="00001"
                                max="99999"
                                step="1"
                                value={customer.loyaltyNumber}
                                onChange={
                                    (e) => {
                                        const copy = {...customer}
                                        copy.loyaltyNumber = parseInt(e.target.value)
                                        setCustomer(copy)
                                    }
                                } />
                        </fieldset>
                        <button type="submit">
                            Update ID
                        </button>
                        <button onClick={goBack}>Go Back</button>
                    </form>
                </section>
            </>
        )
    }

}