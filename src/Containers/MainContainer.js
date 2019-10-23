import React from 'react'
import PlantList from './PlantList'
import NoteList from './NoteList'
import Welcome from '../Components/Welcome'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends React.Component {
    render() {
        return (
            <>
                {this.props.user.id
                ? 
                <Switch>
                    <Route path="/plants" render={() => <PlantList plants={this.props.plants} notes={this.props.notes} user={this.props.user} plantSubmitHandler={this.props.plantSubmitHandler} noteSubmitHandler={this.props.noteSubmitHandler} deletePlant={this.props.deletePlant} deleteNote={this.props.deleteNote}/>} />
                    <Route path="/notes" render={() => <NoteList notes={this.props.notes} deleteNote={this.props.deleteNote}/>} />
                    <Route exact path="/" render={() => <Welcome user={this.props.user} />} />
                    <Route path="/" component={Error} />
                </Switch>
                :
                <Loading />
                }
            </>
        )
    }
}

export default MainContainer