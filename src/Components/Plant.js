import React from 'react'

const Plant = (props) => {
    return (
        // plant card including image, name, species, icons with info for light, water, and color, and delete button
        <div className="ui green card plant-info">
            <div className="image">
                <img alt={props.plant.name} src={props.plant.image}/>
            </div>
            <div className="content">
                <div className="header">
                    <h1>{props.plant.name}</h1>
                </div>
                <div className="description">
                    {props.plant.species}
                </div>
            </div>
            <div className="content">
                <i className="tint green large icon"></i>
                {props.plant.water}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i className="sun green large icon"></i>
                {props.plant.light}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i className="paint brush green large icon"></i>
                {props.plant.color}
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="content">
                <button className="ui green basic button" onClick={() => props.deletePlant(props.plant)}>Delete Plant</button>
            </div>
        </div>
    )
}

export default Plant