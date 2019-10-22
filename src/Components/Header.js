import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <div className="ui huge secondary pointing menu fixed sticky">
                <Link to="/" className="item">
                    Home
                </Link>
                <Link to="/plants" className="item">
                    Plants
                </Link>
                <Link to="/notes" className="item">
                    Notes
                </Link>
                <div className="right menu">
                    <a className="item" onClick={this.props.logout}>
                        Logout
                    </a>
                </div>
            </div>
        )
    }
}

export default Header