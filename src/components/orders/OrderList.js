// displays a list of all products the logged-in customer user has "purchased"
// first: access logged-in user's customer id, assign to state
// then: fetch (GET) all purchases, query string filtering by:
//      customerId 
//      _expand by product
//      and assign to state
// this should have customerId in its dependency because it needs to observe the change to that state to work.
// then: map over filtered purchases in return

import { useEffect, useState } from "react"
import "./OrderList.css"

export const OrderList = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)

    const [customerId, setCustomerId] = useState(0)
    const [purchases, setPurchases] = useState([])
    // in this object:
    // id is userId
    // staff is true or false

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${kandyUserObj.id}`)
                .then(res => res.json())
                .then((customerData) => {
                    setCustomerId(customerData[0].id)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=product&customerId=${customerId}`)
                .then(res => res.json())
                .then((purchasesData) => {
                    setPurchases(purchasesData)
                    console.log(purchases)
                })
        },
        [customerId]
    )

    if (!purchases) {
        return null
    } else {
        return (
            <>
                <h2>My Purchases</h2>
                <section className="purchases">
                    {
                        purchases.map(purchase => {
                            return <div className="purchase">
                                <div className="purchase__name" key={purchase.id}>
                                {purchase.product.name}
                                </div>
                                <div className="purchase__quantity">
                                    Quantity: {purchase.productQuantity}
                                </div>
                            </div>
                        })
                    }
                </section>
            </>
        )
    }

}