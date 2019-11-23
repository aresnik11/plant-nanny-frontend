import React from 'react'
import { Link } from 'react-router-dom'

const PlantCard = (props) => {
    return (
        // links to plant show page
        <Link to={`/plants/${props.plant.id}`} className="plant">
            {/* plant card shows image, name, and species */}
            <div className="ui green card">
                <div className="image" id="plant-image">
                    <img src={props.plant.image} alt={props.plant.name}/>
                </div>
                <div className="content">
                    <div className="header">{props.plant.name}</div>
                    <div className="description">{props.plant.species}</div>
                </div>
            </div>
        </Link>
    )
}

export default PlantCard