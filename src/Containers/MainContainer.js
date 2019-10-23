import React from 'react'
import PlantList from './PlantList'
import NoteList from './NoteList'
import Welcome from '../Components/Welcome'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import { Route, Switch } from 'react-router-dom'

const MainContainer = (props) => {
    return (
        <>
            {/* show loading component until we get the user id from props */}
            {props.user.id
            ? 
            <Switch>
                <Route path="/plants" render={() => <PlantList plants={props.plants} notes={props.notes} user={props.user} plantSubmitHandler={props.plantSubmitHandler} noteSubmitHandler={props.noteSubmitHandler} deletePlant={props.deletePlant} deleteNote={props.deleteNote} />} />
                <Route path="/notes" render={() => <NoteList notes={props.notes} deleteNote={props.deleteNote} />} />
                <Route exact path="/" render={() => <Welcome user={props.user} />} />
                <Route path="/" component={Error} />
            </Switch>
            :
            <Loading />
            }
        </>
    )
}

export default MainContainer