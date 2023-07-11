import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"

export const ApplicationViews = () => {
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

			</Route>
		</Routes>

	)
}
