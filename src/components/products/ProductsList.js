import { useEffect, useState } from "react"
import "./Products.css"

export const ProductsList = () => {
    // console.log("welcome to hell")
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/products`)
                .then(res => res.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        []
    )

    return (
        <article className="productsList">
            <h2 className="productsList__title">Product List</h2>
            <div className="productsList__list">
                {
                    products.map(
                        (product) => {
                            return <section className="productsList__item">
                                <header>{product.name}</header>
                                <div>{product.unitPrice}</div>
                            </section>
                        }
                    )
                }
            </div>
        </article>
    )
}