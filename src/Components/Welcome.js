import React from 'react'

const Welcome = (props) => {
    return (
        <div className="welcome">
            <h1>Welcome {props.user.name}</h1>
            {/* css plant image from https://codepen.io/daliannyvieira/pen/pbJZMQ */}
            <div className="background">
                <div className="table">
                    <div className="bowl">
                        <div className="cable">
                            <div className="leaf-1"></div>
                            <div className="leaf-2"></div>
                            <div className="leaf-3"></div>
                            <div className="leaf-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome