// helper function of CustomerList.js
// accepts props passed from CustomerList.js and renders accordingly
// when name is clicked, links to a detail view of that customer (in CustomerDetails.js)

import { Link } from "react-router-dom"

export const Customer = ({id, name, email}) => {
    return <section className="customers__individual">
        <div>
            Name: <Link to={`/customers/${id}`}>
                {name}
            </Link>
        </div>
        <div>
            Email: {email}
        </div>
    </section>
}