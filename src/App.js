import React from 'react';
import './App.css';
import Header from './Components/Header'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import MainContainer from './Containers/MainContainer';
import SignUp from './Components/SignUp'
import Login from './Components/Login'

class App extends React.Component {
  state = {
    user: {}
  }

  componentDidMount() {
    if (localStorage.token) {
      let token = localStorage.token
      fetch("http://localhost:4001/autologin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `${token}`
        }
      })
      .then(resp => resp.json())
      .then(user => this.setState({user}))
    }
  }

  signUpSubmitHandler = (userInfo) => {
    fetch("http://localhost:4001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(resp => resp.json())
    .then(response => {
      localStorage.setItem("token", response.token)
      this.setState({
        user: response.user
      })
    })
  }

  loginSubmitHandler = (userInfo) => {
    fetch("http://localhost:4001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(resp => resp.json())
    .then(response => {
      localStorage.setItem("token", response.token)
      this.setState({
        user: response.user
      })
    })
  }

  logout = () => {
    localStorage.removeItem("token")
    this.setState({
      user: {}
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <div className="App">
        <Header logout={this.logout}/>        
        <Switch>
          <Route path="/signup" render={() => <SignUp signUpSubmitHandler={this.signUpSubmitHandler} />} />
          <Route path="/login" render={() => <Login loginSubmitHandler={this.loginSubmitHandler} />} />
          <Route path="/">
            {localStorage.token ? <MainContainer /> : <Redirect to="/login" />}
          </Route>
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
