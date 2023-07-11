import { React, useEffect, useState } from "react";
import "./Locations.css"

export const LocationsList = () => {

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        []
    )

    return (
        <article className="locationsList">
            <h2 className="locationsList__title">Visit one of our locations:</h2>
            <div className="locationsList__list">
            {
                locations.map(
                    (location) => {
                        return <section className="locationsList__item" onClick={linkToNorthKorea}>
                            <header>{location.address}, Ohiotown, OH</header>
                            <div>{location.squareFootage} square feet of sweetness</div>
                        </section>
                    }
                )
            }
            </div>
        </article>
    )



}

const linkToNorthKorea = () => {
    window.open("https://goo.gl/maps/Bbs8QUotCXTAgZky9", '_blank')
}