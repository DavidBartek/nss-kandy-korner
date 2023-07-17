import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { ProductForm } from "../productForm/ProductForm"
import { ProductsList } from "../products/ProductsList"

export const EmployeeViews = () => {
    return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>The sweetest lil candy shop in Ohio</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={ <LocationsList /> } />

				<Route path="products" element={ <ProductsList /> } />

				<Route path="products/add" element={ <ProductForm /> } />

			</Route>
		</Routes>
    )
}