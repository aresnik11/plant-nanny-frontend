import React from 'react'
import PlantList from './PlantList'
import NoteList from './NoteList'
import Welcome from '../Components/Welcome'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.user.id
                ? 
                <Switch>
                    <Route path="/plants" render={() => <PlantList plants={this.props.plants} notes={this.props.notes} user={this.props.user} plantSubmitHandler={this.props.plantSubmitHandler} noteSubmitHandler={this.props.noteSubmitHandler} />} />
                    <Route path="/notes" render={() => <NoteList notes={this.props.notes} />} />
                    <Route exact path="/" component={Welcome} />
                </Switch>
                :
                <h1>Loading</h1>
                }
            </div>
        )
    }
}

export default MainContainer