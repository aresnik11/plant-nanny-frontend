import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    state = {
        home: false,
        plants: false, 
        notes: false,
        login: true
    }

    // setting which tab of the header is the active item and is in green
    changeActive = (e) => {
        // if user is logged in
        if (this.props.user.id) {
            // reset home, plants, notes to false in state - makes them not active
            this.setState({
                home: false,
                plants: false, 
                notes: false,
            })
            // set menu option clicked on to true in state, if true it will have the className active item
            this.setState({
                [e.target.name]: true
            })
        }
        // if user is not logged in, set login to true in state since they can only be on that page
        else {
            this.setState({
                login: true
            })
        }
    }

    render() {
        return (
            <div className="ui huge green secondary pointing menu fixed sticky">
                {/* menu options, if option in state is true, will have active item className and will show as selected */}
                <Link to="/" name="home" className={this.state.home ? "active item" : "item"} onClick={this.changeActive}>
                    Home
                </Link>
                <Link to="/plants" name="plants" className={this.state.plants ? "active item" : "item"} onClick={this.changeActive}>
                    Plants
                </Link>
                <Link to="/notes" name="notes" className={this.state.notes ? "active item" : "item"} onClick={this.changeActive}>
                    Notes
                </Link>
                <div className="right menu">
                    {/* if user is logged in, show log out in menu. otherwise show log in */}
                    {this.props.user.id
                    ?
                    <Link to="#" className="item" onClick={(e) => {this.changeActive(e); this.props.logout()}}>Log Out</Link>
                    :
                    <Link to="/login" name="login" className={this.state.login ? "active item" : "item"} onClick={this.changeActive}>Log In</Link>}
                </div>
            </div>
        )
    }
}

export default Header