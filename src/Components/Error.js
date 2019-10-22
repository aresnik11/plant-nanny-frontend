import React from 'react'
import PlantImage from './PlantImage'
import BackgroundRight from './BackgroundRight'
import BackgroundLeft from './BackgroundLeft'

const Error = () => {
    return (
        <div className="test">
            <BackgroundLeft />
            <div>
                <h1>Sorry, we can't find that page</h1>
                <PlantImage />
            </div>
            <BackgroundRight />
        </div>
    )
}

export default Error