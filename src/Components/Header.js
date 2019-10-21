import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>Header</h1>
            <h1 onClick={props.logout}>Logout</h1>
        </div>
    )
}

export default Header