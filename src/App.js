import React from 'react';
import './App.css';
import './Semantic-UI-CSS-master/semantic.min.css'
import Header from './Components/Header'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import MainContainer from './Containers/MainContainer';
import SignUp_Login from './Components/SignUp_Login'

class App extends React.Component {
  state = {
    user: {},
    plants: [],
    notes: []
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
      // .then((resp)=> console.log("APP CDM: ", resp))
      .then(user => this.setState({
        user: user,
        plants: user.plants,
        notes: user.notes
      }))
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
      if (response.errors) {
        console.log(response.errors)
      }
      else {
        localStorage.setItem("token", response.token)
        this.setState({
          user: response.user
        }, () => this.props.history.push("/"))
      }
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
      if (response.errors) {
        console.log(response.errors)
      }
      else {
        localStorage.setItem("token", response.token)
        this.setState({
          user: response.user
        }, () => this.props.history.push("/"))
      }
    })
  }

  plantSubmitHandler = (plant) => {
    console.log("in plant submit handler", plant)
    fetch("http://localhost:4001/plants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(plant)
    })
    .then(resp => resp.json())
    .then(newPlant => {
        let plantsCopy = [...this.state.plants, newPlant]
        this.setState({
            plants: plantsCopy
        })
    })
  }

noteSubmitHandler = (note) => {
    fetch("http://localhost:4001/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(resp => resp.json())
    .then(newNote => {
        let notesCopy = [...this.state.notes, newNote]
        this.setState({
            notes: notesCopy
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
    return (
      <div className="App">
        <Header logout={this.logout}/>  
        <div className="main-container">   
          <Switch>
            <Route path="/signup" render={() => <SignUp signUpSubmitHandler={this.signUpSubmitHandler} />} />
            <Route path="/login" render={() => <Login loginSubmitHandler={this.loginSubmitHandler} />} />
            {/* if you are not logged in and try to go to any page, redirect to login */}
            <Route path="/">
              {localStorage.token ? <MainContainer user={this.state.user} plants={this.state.plants} notes={this.state.notes} noteSubmitHandler={this.noteSubmitHandler} plantSubmitHandler={this.plantSubmitHandler} /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>   
      </div>
    );
  }
}

export default withRouter(App);
