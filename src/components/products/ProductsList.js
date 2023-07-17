import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [expensiveOnly, setExpensiveOnly] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)

    // inside return:
    // {
    //     kandyUserObj.staff
    //         ? 
    //             <li className="navbar__item navbar__products">
    //             <Link className="navbar__link" to="/products">Products</Link>
    //             </li>
    //         :
    //             console.log("Non-staff login; product link not displaying")
    // }

    // options to sort the array of products by name:
    // option 1: sort incoming json data with javascript. See commented-out .sort method below.
    // in this case, the fetch url would be http://localhost:8088/products?_sort=name
    // option 2 (above): modify the fetch url to invoke the _sort query string parameter. See fetch url.

    useEffect(
        () => {
            fetch (`http://localhost:8088/products?_sort=name&_expand=type`)
                .then(res => res.json())
                .then((productsArray) => {
                    // productsArray.sort((a, b) => {
                    //     if (a.name < b.name) {
                    //         return -1
                    //     } else if ( a.name > b.name ) {
                    //         return 1
                    //     } else {
                    //         return 0
                    //     }
                    // })
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
            <div className="productsList__list">
                {filteredProducts.map(
                    (product) => {
                        return <section className="productsList__item">
                            <header className="item__header">{product?.name}</header>
                            <div className="item__info">{product?.type?.type}</div>
                            <div className="item__info">${product?.unitPrice} each</div>
                        </section>
                    }
                )}
            </div>
        </article>
        </>
    )
}