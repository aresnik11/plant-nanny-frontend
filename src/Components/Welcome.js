import React from 'react'
import PlantImage from './PlantImage'

const Welcome = (props) => {
    return (
        <div className="welcome">
            <h1>Welcome {props.user.name}</h1>
            <PlantImage />
        </div>
    )
}

export default Welcome