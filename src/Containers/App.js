import React from 'react';
import '../CSS/App.css';
import '../CSS/Background.scss';
import '../CSS/Semantic-UI-CSS-master/semantic.min.css'
import '../CSS/Leaf.css'
import Header from '../Components/Header'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import MainContainer from './MainContainer';
import Login from '../Components/Login'
import Logo from '../Components/Logo'

class App extends React.Component {
  state = {
    user: {},
    plants: [],
    notes: []
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:4001/auto_login", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(resp => resp.json())
      .then(response => {
        if (response.errors) {
          this.logout()
        }
        else {
          this.setState({
            user: {
              id: response.user.id,
              name: response.user.name
            },
            plants: response.user.plants,
            notes: response.user.notes
          })
        }
      })
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
        })
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
        })
      }
    })
  }

  plantSubmitHandler = (plant) => {
    fetch("http://localhost:4001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(plant)
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        const plantsCopy = [...this.state.plants, response]
        this.setState({
          plants: plantsCopy
        })
      }
    })
  }

  noteSubmitHandler = (note) => {
    fetch("http://localhost:4001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(note)
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        const notesCopy = [...this.state.notes, response]
        this.setState({
          notes: notesCopy
        })
      }
    })
  }

  logout = () => {
    localStorage.removeItem("token")
    this.setState({
      user: {}
    })
  }

  deletePlant = (plant) => {
    fetch(`http://localhost:4001/plants/${plant.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(resp => resp.json())
    .then(response => { 
      if (response.errors) {
        alert(response.errors)
      }
      else {
        const plantsCopy = [...this.state.plants]
        const newPlants = plantsCopy.filter(p => p.id !== plant.id)
        const notesCopy = [...this.state.notes]
        const newNotes = notesCopy.filter(note => note.plant.id !== plant.id)
        this.setState({
          plants: newPlants,
          notes: newNotes
        })
        this.props.history.push("/plants")
      }
    })
  }

  deleteNote = (note) => {
    fetch(`http://localhost:4001/notes/${note.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        const notesCopy = [...this.state.notes]
        const newNotes = notesCopy.filter(n => n.id !== note.id)
        this.setState({
          notes: newNotes
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header logout={this.logout} user={this.state.user} />  
        <div className="main-container">   
          <Logo />
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
              <MainContainer user={this.state.user} plants={this.state.plants} notes={this.state.notes} noteSubmitHandler={this.noteSubmitHandler} plantSubmitHandler={this.plantSubmitHandler} deletePlant={this.deletePlant} deleteNote={this.deleteNote}/>
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
