import { useEffect, useState } from "react"
import "./Products.css"

export const ProductsList = () => {
    // console.log("welcome to hell")
    const [products, setProducts] = useState([])
    const [expensiveOnly, setExpensiveOnly] = useState(false)
    const [filteredProducts, setFiltered] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/products`)
                .then(res => res.json())
                .then((productsArray) => {
                    productsArray.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1
                        } else if ( a.name > b.name ) {
                            return 1
                        } else {
                            return 0
                        }
                    })
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
            <div className="productsList__list">
                {filteredProducts.map(
                    (product) => {
                        return <section className="productsList__item">
                            <header>{product.name}</header>
                            <div>{product.unitPrice}</div>
                        </section>
                    }
                )}
            </div>
        </article>
        </>
    )
}