import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__locations">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>

            <li className="navbar__item navbar__products">
               <Link className="navbar__link" to="/products">Products</Link>
            </li>
            
            <li className="navbar__item navbar__find">
                <Link className="navbar__link" to="/find">Find Candy</Link>
            </li>

            <li className="navbar__item navbar__orders">
                <Link className="navbar__link" to="/orders">My Orders</Link>
            </li>

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}