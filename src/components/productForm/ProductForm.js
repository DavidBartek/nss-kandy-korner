import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

export const ProductForm = () => {
    const [newProduct, update] = useState({
        name: "",
        typeId: 0,
        type: "",
        unitPrice: 0
    })
    const [productTypes, setProductTypesArr] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
            fetch('http://localhost:8088/types')
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
        <form className="productForm" onSubmit={(e) => handleSaveButtonClick(e)}>
            <h2 className="productForm__title">Add New Product</h2>
            
            <fieldset className="form-group">
                <label htmlFor="name">Product name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="What would you like to give you diabeetus?"
                    value={newProduct.name}
                    onChange={
                        (e) => {
                            const copy = {...newProduct}
                            copy.name = e.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            
            <fieldset className="form-group">
                <label htmlFor="type">Product type: </label>
                <select
                    required
                    onChange={
                        (e) => {
                            const shallowCopy = {...newProduct}
                            shallowCopy.typeId = e.target.value
                            update(shallowCopy)

                        }
                    }>
                    
                    <option value="">Select type</option>
                    {productTypes.map((type) => {
                        return <option key={type.id} value={type.id}>
                            {type.type}
                        </option>
                    })}
                </select>
            </fieldset>
            
            <fieldset className="form-group">
                <label htmlFor="price">Unit price: $ </label>
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
                type="submit"
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