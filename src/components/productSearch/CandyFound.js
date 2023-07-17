import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CandyFound = ({searchTermsState}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()

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
            const searchedCandies = products.filter(product => {
                return product.name.toLowerCase().includes(searchTermsState.toLowerCase())
            })
            setFiltered(searchedCandies)
        },
        [searchTermsState]
    )
    
    const handleClick = (e) => {
        e.preventDefault()
        window.alert("functionality needs to be set up")
    }

    if (!products) {
        return null
    } else if (searchTermsState === "") {
        return null
    } else {
        return (
            <>
                <article className="productsList">
                    <div className="productsList__list">
                        {filteredProducts.map(
                            (product) => {
                                return <section className="productsList__item" key={product.id}>
                                    <header className="item__header">{product.name}</header>
                                    <div className="item__info">${product.unitPrice} each</div>
                                    <div>-</div>
                                    <a href="#" onClick={handleClick}>Show me where</a>
                                </section>
                            }
                        )}
                    </div>
                </article>
            </>
        )
    }
}