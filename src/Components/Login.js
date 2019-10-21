import React from 'react'

class Login extends React.Component {
    state = {
        name: "",
        password: ""
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginSubmitHandler = (e) => {
        e.preventDefault()
        this.props.loginSubmitHandler(this.state)
        this.setState({
            name: "",
            password: ""
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.loginSubmitHandler}>
                    <input type="text" name="name" value={this.state.name} onChange={this.inputChangeHandler} />
                    <input type="password" name="password" value={this.state.password} onChange={this.inputChangeHandler} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Login