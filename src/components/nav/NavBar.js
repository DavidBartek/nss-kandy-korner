import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__locations">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>

            <li className="navbar__item navbar__products">
               <Link className="navbar__link" to="/products">Products</Link>
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

// version of website in which "Products" link does not display for a customer, only for employee

// outside of return: 
// const localKandyUser = localStorage.getItem("kandy_user")
// const kandyUserObj = JSON.parse(localKandyUser)

// inside return:
// {
//     kandyUserObj.staff
//         ? 
//             <li className="navbar__item navbar__products">
//             <Link className="navbar__link" to="/products">Products</Link>
//             </li>
//         :
//             console.log("Non-staff login; product link not displaying")
// }