import React from 'react'
import PlantList from './PlantList'
import NoteList from './NoteList'
import Welcome from '../Components/Welcome'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends React.Component {
    state = {
        plants: [],
        notes: [], 
        user: {}
      }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                user: {...this.props.user}
            })
        }
    }
    
    componentDidMount() {
        if (this.state.user) {
            fetch(`http://localhost:4001/users/${this.state.user.id}`)
            .then(resp => resp.json())
            .then(data => this.setState({
              plants: data.plants,
              notes: data.notes
            }))
        } else {
            console.log("everything is undefined")
        }
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
        console.log("in main", this.state.user)
        console.log(this.state.plants)
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