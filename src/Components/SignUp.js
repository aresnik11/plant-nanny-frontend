import React from 'react'

class SignUp extends React.Component {
    state = {
        name: "",
        password: ""
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUpSubmitHandler = (e) => {
        e.preventDefault()
        this.props.signUpSubmitHandler(this.state)
        this.setState({
            name: "",
            password: ""
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.signUpSubmitHandler}>
                    <input type="text" name="name" value={this.state.name} onChange={this.inputChangeHandler} />
                    <input type="password" name="password" value={this.state.password} onChange={this.inputChangeHandler} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default SignUp