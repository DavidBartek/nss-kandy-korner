// helper function, receiving props from parent EmployeeList

export const Employee = ({id, location, name, startDate, payRate}) => {
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
    </section>
}