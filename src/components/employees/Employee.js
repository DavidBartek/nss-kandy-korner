// helper function, receiving props from parent EmployeeList

export const Employee = ({id, location, name, startDate, payRate, getAllEmployees}) => {
    
    const handleFireButton = (e) => {
        console.log("ur fired")
        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                console.log(`DESTROYED employee with id ${id}, aka ${name}`)
                window.alert(`${name} is now unemployed`)
                getAllEmployees()
            })
    }
    
    return <section className="employees__individual">
        <div>
            Name: {name}
        </div>
        <div>
            Works at {location}
        </div>
        <div>
            Started {startDate}
        </div>
        <div>
            Hourly rate: ${payRate}
        </div>
        <button className="employees__fire" onClick={handleFireButton}>
            Fire Employee
        </button>
    </section>
}