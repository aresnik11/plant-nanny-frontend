import React from 'react';
import './App.css';
import './CSS/Background.scss';
import './CSS/Semantic-UI-CSS-master/semantic.min.css'
import './CSS/Leaf.css'
import Header from './Components/Header'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import MainContainer from './Containers/MainContainer';
import Login from './Components/Login'

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
      .then(response => this.setState({
        user: {
          id: response.user.id,
          name: response.user.name
        },
        plants: response.user.plants,
        notes: response.user.notes
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
        alert(response.errors)
      }
      else {
        localStorage.setItem("token", response.token)
        this.setState({
          user: {
            id: response.user.id,
            name: response.user.name
          },
          plants: response.user.plants,
          notes: response.user.notes
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
        alert(response.errors)
      }
      else {
        localStorage.setItem("token", response.token)
        this.setState({
          user: {
            id: response.user.id,
            name: response.user.name
          },
          plants: response.user.plants,
          notes: response.user.notes
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

  deletePlant = (plant) => {
    let newPlants = [...this.state.plants]
    newPlants = newPlants.filter((p) => p.id !== plant.id)
    let plantId = plant.id
    fetch(`http://localhost:4001/plants/${plantId}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => { 
      this.props.history.push("/plants")
      this.setState({
        plants: newPlants
      })
    })

    
  }

  render() {
    console.log(this.state.plants)
    return (
      <div className="App">
        <Header logout={this.logout} user={this.state.user} />  
        <div className="main-container">   
          <Switch>
            {/* if you are logged in and try to go to /login, redirect to welcome page. Otherwise go to login */}
            <Route path="/login">
              {localStorage.token
                ?
                <Redirect to="/"/>
                :
                <Login signUpSubmitHandler={this.signUpSubmitHandler} loginSubmitHandler={this.loginSubmitHandler} />}
            </Route>
            {/* if you are not logged in and try to go to any page, redirect to login. Otherwise go to that page */}
            <Route path="/">
              {localStorage.token
                ?
                <MainContainer user={this.state.user} plants={this.state.plants} notes={this.state.notes} noteSubmitHandler={this.noteSubmitHandler} plantSubmitHandler={this.plantSubmitHandler} />
                :
                <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>   
      </div>
    );
  }
}

export default withRouter(App);
