import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
	const kandyUserObj = JSON.parse(localKandyUser)

    if (kandyUserObj.staff) {
        return < EmployeeNav />
    } else {
        return < CustomerNav />
    }
}