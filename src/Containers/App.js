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
import ScrollToTop from '../Components/ScrollToTop'

class App extends React.Component {
  state = {
    user: {},
    plants: [],
    notes: []
  }

  componentDidMount() {
    // if there is a token in localStorage, see if we can autologin the user
    if (localStorage.getItem("token")) {
      fetch("https://plant-nanny-backend.herokuapp.com/auto_login", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(resp => resp.json())
      .then(response => {
        // if we got back an error, weren't able to decode the token so remove token from localStorage via logout function
        if (response.errors) {
          this.logout()
        }
        // if we were able to decode the token, set state based on response
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

  // creates a new user in backend with userInfo provided, sets token in localStorage and sets state with user info if successful
  signUpSubmitHandler = (userInfo) => {
    fetch("https://plant-nanny-backend.herokuapp.com/users", {
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

  // verifies if userInfo provided matches user in backend, sets token in localStorage and sets state with user info if successful
  loginSubmitHandler = (userInfo) => {
    fetch("https://plant-nanny-backend.herokuapp.com/login", {
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

  // removes token from localStorage and resets user in state
  logout = () => {
    localStorage.removeItem("token")
    this.setState({
      user: {}
    })
  }

  // auto logs in to demo account
  demoLogIn = () => {
    fetch("https://plant-nanny-backend.herokuapp.com/demo_login")
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

  // creates a new plant in backend, if successful adds a new plant to current plants state
  plantSubmitHandler = (plant) => {
    fetch("https://plant-nanny-backend.herokuapp.com/plants", {
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

  // creates a new note in backend, if successful adds a new note to current notes state
  noteSubmitHandler = (note) => {
    fetch("https://plant-nanny-backend.herokuapp.com/notes", {
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

  // deletes plant in backend, if successful removes the plant from current plants state, and redirects to /plants
  deletePlant = (plant) => {
    fetch(`https://plant-nanny-backend.herokuapp.com/plants/${plant.id}`, {
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

  // deletes note in backend, if successful removes the note from current notes state
  deleteNote = (note) => {
    fetch(`https://plant-nanny-backend.herokuapp.com/notes/${note.id}`, {
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
        {/* Header component renders on every page */}
        <Header logout={this.logout} user={this.state.user} />  
        <div className="main-container">
          {/* Logo component renders on every page */}
          <Logo />
          {/* auto scrolls each page back to the top */}
          <ScrollToTop>
            <Switch>
              {/* if you are logged in and try to go to /login, redirect to welcome page (via main container). Otherwise go to login */}
              <Route path="/login">
                {localStorage.token
                ?
                <Redirect to="/"/>
                :
                <Login
                  signUpSubmitHandler={this.signUpSubmitHandler}
                  loginSubmitHandler={this.loginSubmitHandler}
                  demoLogIn={this.demoLogIn}
                />}
              </Route>
              {/* if you are not logged in and try to go to any page, redirect to login. Otherwise go to that page (via main container) */}
              <Route path="/">
                {localStorage.token
                ?
                <MainContainer
                  user={this.state.user}
                  plants={this.state.plants}
                  notes={this.state.notes}
                  noteSubmitHandler={this.noteSubmitHandler}
                  plantSubmitHandler={this.plantSubmitHandler}
                  deletePlant={this.deletePlant}
                  deleteNote={this.deleteNote}
                />
                :
                <Redirect to="/login" />}
              </Route>
            </Switch>
          </ScrollToTop>
        </div>   
      </div>
    );
  }
}

export default withRouter(App);
