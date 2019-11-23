import React from 'react'

class Login extends React.Component {
    state = {
        login: {
            name: "",
            password: ""
        }, 
        signUp: {
            name: "",
            password: ""
        }
    }

    // controlled sign up form
    signUpChangeHandler = (e) => {
        const key = e.target.name
        const newSignUp = {...this.state.signUp}
        newSignUp[key] = e.target.value
        this.setState({
            signUp: newSignUp
        })
    }

    // controlled log in form
    loginChangeHandler = (e) => {
        const key = e.target.name
        const newLogin = {...this.state.login}
        newLogin[key] = e.target.value
        this.setState({
            login: newLogin
        })
    }

    signUpSubmitHandler = (e) => {
        e.preventDefault()
        // sends submitted values up to send to backend and update state
        this.props.signUpSubmitHandler(this.state.signUp)
        // resets all values in form
        this.setState({
            login: {
                name: "",
                password: ""
            }, 
            signUp: {
                name: "",
                password: ""
            }
        })
    }

    loginSubmitHandler = (e) => {
        e.preventDefault()
        // sends submitted values up to send to backend and update state
        this.props.loginSubmitHandler(this.state.login)
        // resets all values in form
        this.setState({
            login: {
                name: "",
                password: ""
            }, 
            signUp: {
                name: "",
                password: ""
            }
        })
    }

    render() {
        return (
            <div>
                <div className="ui placeholder segment">
                    {/* one page for both log in and sign up forms */}
                    <div className="ui two column very relaxed stackable grid">
                        {/* sign up form */}
                        <div className="column">
                            <form className="ui form" onSubmit={this.signUpSubmitHandler}>
                                <br />
                                <div className="field">
                                    <label>Username</label>
                                    <div className="ui left icon input">
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.signUp.name}
                                            placeholder="Username"
                                            onChange={this.signUpChangeHandler}
                                        />
                                        <i className="user icon"></i>
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <label>Password</label>
                                    <div className="ui left icon input">
                                        <input
                                            type="password"
                                            name="password"
                                            value={this.state.signUp.password}
                                            placeholder="Password"
                                            onChange={this.signUpChangeHandler}
                                        />
                                        <i className="lock icon"></i>
                                    </div>
                                </div>
                                <br />
                                <button type="submit" className="ui green basic button" >Sign Up</button>
                                <br />
                            </form>
                        </div>
                        {/* log in form */}
                        <div className="column">
                            <form className="ui form" onSubmit={this.loginSubmitHandler}>
                                <br />
                                <div className="field">
                                    <label>Username</label>
                                    <div className="ui left icon input">
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.login.name}
                                            placeholder="Username"
                                            onChange={this.loginChangeHandler}
                                        />
                                        <i className="user icon"></i>
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <label>Password</label>
                                    <div className="ui left icon input">
                                        <input
                                            type="password"
                                            name="password"
                                            value={this.state.login.password}
                                            placeholder="Password"
                                            onChange={this.loginChangeHandler}
                                        />
                                        <i className="lock icon"></i>
                                    </div>
                                </div>
                                <br />
                                <button type="submit" className="ui green basic button">Log In</button>
                                <br />
                            </form>
                        </div>
                    </div>
                    <div className="ui vertical divider">Or</div>
                </div>
                <br/><br/>
                <button className="ui green basic button" onClick={this.props.demoLogIn}>Demo Log In</button>
            </div>
        )
    }
}

export default Login