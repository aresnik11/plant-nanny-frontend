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
                    {this.props.user.id
                    ?
                    <a className="item" onClick={this.props.logout}>Logout</a>
                    :
                    <Link to="/login" className="item">Login</Link>}
                </div>
            </div>
        )
    }
}

export default Header