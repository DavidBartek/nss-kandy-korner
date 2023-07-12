import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    const [newProduct, update] = useState({
        name: "",
        typeId: 0,
        type: "",
        unitPrice: null
    })
    const [productTypes, setProductTypesArr] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
            fetch('http://localhost:8088/productTypes')
                .then(res => res.json())
                .then((typesArray) => {
                    setProductTypesArr(typesArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const newProductToAPI = {
            name: newProduct.name,
            typeId: newProduct.typeId,
            type: newProduct.type,
            unitPrice: newProduct.unitPrice
        }

        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProductToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">Add New Product</h2>
            
            <fieldset className="form-group">
                <label htmlFor="name">Product name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="ur mum"
                    value={newProduct.name}
                    onChange={
                        (e) => {
                            const shallowCopy = {...newProduct}
                            shallowCopy.name = e.target.value
                            update(shallowCopy)
                        }
                    } />
            </fieldset>
            
            <fieldset className="form-group">
                <label htmlFor="type">Product type:</label>
                <select
                    required
                    onChange={
                        (e) => {
                            const shallowCopy = {...newProduct}
                            shallowCopy.type = e.target.value
                            shallowCopy.typeId = e.target.options[e.target.selectedIndex].getAttribute('data-key')
                            update(shallowCopy)

                        }
                    }>
                    
                    <option value="">Select type</option>
                    {productTypes.map((type) => {
                        return <option data-key={type.id} value={type.type}>
                            {type.type}
                        </option>
                    })}
                </select>
            </fieldset>
            
            <fieldset className="form-group">
                <label htmlFor="price">Unit price: $</label>
                <input
                    required
                    type="number"
                    min="0.00"
                    max="20.00"
                    step="0.01"
                    value={newProduct.unitPrice}
                    onChange={
                        (e) => {
                            const shallowCopy = {...newProduct}
                            shallowCopy.unitPrice = e.target.value
                            update(shallowCopy)
                        }
                    } />
            </fieldset>

            <button
                onClick={(e) => handleSaveButtonClick(e)}
                className="productForm__button">
                Add Product
            </button>
            <button
                onClick={(e) => navigate("/products")}
                className="productForm__button">
                    Return to products
            </button>
        </form>
    )
}