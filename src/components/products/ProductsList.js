import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [expensiveOnly, setExpensiveOnly] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    const [customerId, setCustomerId] = useState(0)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)
    // in this object:
    // id is userId
    // staff is true or false

    useEffect(
        () => {
            fetch (`http://localhost:8088/products?_sort=name&_expand=type`)
                .then(res => res.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        []
    )
    
    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (expensiveOnly) {
                const expensiveProducts = products.filter(product => product.unitPrice > 2.00)
                setFiltered(expensiveProducts)
            } else {
                setFiltered(products)
            }
        },
        [expensiveOnly]
    )

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

    // creates an object containing customerId, productId, productQuantity (1)
    // POST object to API database, "purchases"
    const handlePurchaseClick = (e) => {
        // console.log("hi")
        e.preventDefault()
        // console.log(e.target)
        const purchaseToPost = {
            customerId: customerId,
            productId: parseInt(e.target.value),
            productQuantity: 1
        }
        // console.log(purchaseToPost)
        
        return fetch('http://localhost:8088/purchases', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(purchaseToPost)
        })
            .then(res => res.json())
            .then(() => {
                console.log("purchase added to database")
            })
    }

    return (
        <>
            <article className="productsList">
            <h2 className="productsList__title">Product List</h2>
            <button className="productsButton" onClick={() => { setExpensiveOnly(true) } }>Show Top Priced</button>
            <button className="productsButton" onClick={() => { setExpensiveOnly(false) } }>Show All</button>
            {
                kandyUserObj.staff 
                ? <>
                    <button className="productsButton" onClick={() => navigate("/products/add")}>Add Product</button>
                </>
                : <></>
            }
            {
                kandyUserObj.staff
                ? <>
                    <div className="productsList__list">
                        {filteredProducts.map(
                            (product) => {
                                return <section className="productsList__item" key={product.id}>
                                    <header className="item__header">{product?.name}</header>
                                    <div className="item__info">{product?.type?.type}</div>
                                    <div className="item__info">${product?.unitPrice} each</div>
                                </section>
                            }
                        )}
                    </div>  
                </>
                : <>
                    <div className="productsList__list">
                        {filteredProducts.map(
                            (product) => {
                                return <section className="productsList__item" key={product.id}>
                                    <header className="item__header">{product?.name}</header>
                                    <div className="item__info">{product?.type?.type}</div>
                                    <div className="item__info">${product?.unitPrice} each</div>
                                    <button className="item__purchase" value={product.id} onClick={(e) => handlePurchaseClick(e)}>Purchase</button>
                                </section>
                            }
                        )}
                    </div>  
                
                </>
            }
            
            
        </article>
        </>
    )
}