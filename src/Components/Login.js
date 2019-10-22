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
            <div>
                <div>
                    <form onSubmit={this.signUpSubmitHandler}>Sign Up: 
                        <input type="text" name="name" value={this.state.signUp.name} onChange={this.signUpChangeHandler} />
                        <input type="password" name="password" value={this.state.signUp.password} onChange={this.signUpChangeHandler} />
                        <input type="submit" value="Sign Up"/>
                    </form>
                </div>
                <div>
                    <form onSubmit={this.loginSubmitHandler}>Login:
                        <input type="text" name="name" value={this.state.login.name} onChange={this.loginChangeHandler} />
                        <input type="password" name="password" value={this.state.login.password} onChange={this.loginChangeHandler} />
                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login