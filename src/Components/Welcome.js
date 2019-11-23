import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = (props) => {
    return (
        <div className="welcome">
            <h1>Welcome {props.user.name}</h1>
            <br/>
            <Link to="/plants">
                <button className="ui green basic button">My Plants</button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/notes">
                <button className="ui green basic button">My Notes</button>
            </Link>

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