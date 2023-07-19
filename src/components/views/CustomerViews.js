import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { ProductForm } from "../productForm/ProductForm"
import { ProductsList } from "../products/ProductsList"
import { SearchContainer } from "../productSearch/SearchContainer"
import { OrderList } from "../orders/OrderList"

export const CustomerViews = () => {
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

                <Route path="find" element={ <SearchContainer /> } />

				<Route path="orders" element={ <OrderList /> } />

			</Route>
		</Routes>
    )
}