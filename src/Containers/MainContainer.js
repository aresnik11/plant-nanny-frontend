import React from 'react'
import PlantList from './PlantList'
import NoteList from './NoteList'
import Welcome from '../Components/Welcome'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends React.Component {
    state = {
        plants: [],
        notes: []
      }
    
      componentDidMount() {
        fetch(`http://localhost:4001/users/1`)
        .then(resp => resp.json())
        .then(data => this.setState({
          plants: data.plants,
          notes: data.notes
        }))
      }
    
      plantSubmitHandler = (plant) => {
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

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/plants" render={() => <PlantList plants={this.state.plants} plantSubmitHandler={this.plantSubmitHandler} notes={this.state.notes} noteSubmitHandler={this.noteSubmitHandler} />} />
                    <Route path="/notes" render={() => <NoteList notes={this.state.notes} />} />
                    <Route exact path="/" component={Welcome} />
                </Switch>
            </div>
        )
    }
}

export default MainContainer