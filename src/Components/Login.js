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

    signUpChangeHandler = (e) => {
        let key = e.target.name
        let newSignUp = {...this.state.signUp}
        newSignUp[key] = e.target.value
        this.setState({
            signUp: newSignUp
        })
    }

    loginChangeHandler = (e) => {
        let key = e.target.name
        let newLogin = {...this.state.login}
        newLogin[key] = e.target.value
        this.setState({
            login: newLogin
        })
    }

    signUpSubmitHandler = (e) => {
        e.preventDefault()
        this.props.signUpSubmitHandler(this.state.signUp)
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
        this.props.loginSubmitHandler(this.state.login)
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

            <div className="ui placeholder segment">
                <div className="ui two column very relaxed stackable grid">
                    <div className="column">
                        <form className="ui form" onSubmit={this.signUpSubmitHandler}>
                            <br />
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input type="text" name="name" value={this.state.signUp.name} placeholder="Username" onChange={this.signUpChangeHandler}/>
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <br />
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input type="password" name="password" value={this.state.signUp.password} placeholder="Password" onChange={this.signUpChangeHandler}/>
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="ui green basic button" >Sign Up</button>
                            <br />
                        </form>
                    </div>
                    <div className="column">
                        <form className="ui form" onSubmit={this.loginSubmitHandler}>
                            <br />
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input type="text" name="name" value={this.state.login.name}placeholder="Username" onChange={this.loginChangeHandler}/>
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <br />
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input type="password" name="password" value={this.state.login.password} placeholder="Password" onChange={this.loginChangeHandler}/>
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="ui green basic button" >Log In</button>
                            <br />
                        </form>
                    </div>
                </div>
                <div className="ui vertical divider">
                    Or
                </div>
            </div>
        )
    }
}




export default Login