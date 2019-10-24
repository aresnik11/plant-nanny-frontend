import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    
    state = {
        home: false,
        plants: false, 
        notes: false,
        login: true
    }

    changeActive = (e) => {
        if (this.props.user.id) {
            this.setState({
                home: false,
                plants: false, 
                notes: false,
            })
            this.setState({
                [e.target.name]: true
            })
        } else {
            this.setState({
                login: true
            })
        }
    }

    render() {
        return (
            <div className="ui huge green secondary pointing menu fixed sticky">
                <Link to="/" name="home" className={this.state.home ? "active item" : "item"} onClick={(e) => this.changeActive(e)}>
                    Home
                </Link>
                <Link to="/plants" name="plants" className={this.state.plants ? "active item" : "item"} onClick={(e) => this.changeActive(e)}>
                    Plants
                </Link>
                <Link to="/notes" name="notes" className={this.state.notes ? "active item" : "item"} onClick={(e) => this.changeActive(e)}>
                    Notes
                </Link>
                <div className="right menu">
                    {this.props.user.id
                    ?
                    <a className="item" onClick={(e) => {this.changeActive(e); this.props.logout()}}>Logout</a>
                    :
                    <Link to="/login" className={this.state.login ? "active item" : "item"} onClick={(e) => this.changeActive(e)}>Login</Link>}
                </div>
            </div>
        )
    }
}

export default Header