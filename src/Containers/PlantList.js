import React from 'react'
import Search from '../Components/Search'
import NewPlant from '../Components/NewPlant'
import Plant from '../Components/Plant'
import PlantCard from '../Components/PlantCard'
import NoteList from '../Containers/NoteList'
import Error from '../Components/Error'
import { Route, Switch } from 'react-router-dom'

class PlantList extends React.Component {
    state = {
        searchTerm: "",
    }

    // controlled search form
    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    // filters plants based on search term, creates a plant card component for each plant in filtered plants
    makePlants = () => {
        const filteredPlants = this.props.plants.filter(plant => plant.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredPlants.map(plant => <PlantCard key={plant.id} plant={plant} user={this.props.user} />)
    }

    render() {
        return (
            // render differently depending on /plants or /plants/:id route
            <Switch>
                <Route path="/plants/:id" render={(routerProps) => {
                    const plantId = parseInt(routerProps.match.params.id)
                    const plantObj = this.props.plants.find(plant => plant.id === plantId)
                    //only render Plant component if we found the plant object
                    if (plantObj) {
                        const plantNotes = this.props.notes.filter(note => note.plant.id === plantId)
                        return (
                            <div className="plant-page">
                                {/* plant specific info */}
                                <Plant
                                    plant={plantObj}
                                    user={this.props.user}
                                    deletePlant={this.props.deletePlant}
                                />
                                <div>
                                    {/* note list for this plant */}
                                    <NoteList
                                        notes={plantNotes}
                                        deleteNote={this.props.deleteNote}
                                        plant={plantObj}
                                        user={this.props.user}
                                        noteSubmitHandler={this.props.noteSubmitHandler}
                                    />
                                </div>
                            </div>
                        )
                    }
                    //if we couldn't find the plant object, render Error Component
                    else {
                        return <Error />
                    }
                }} />
                <Route path="/plants" render={() => {
                    return (
                        <>
                            {/* only render search and plants if there are plants */}
                            {this.props.plants.length
                            ?
                            <>
                                <Search
                                    searchTerm={this.state.searchTerm}
                                    searchChangeHandler={this.searchChangeHandler}
                                    type="Plants"
                                />
                                <br/><br/>
                                <div className="ui cards">
                                    {this.makePlants()}
                                </div>
                                <br/><br/>
                            </>
                            :
                            null}
                            {/* render new plant no matter what */}
                            <NewPlant
                                plantSubmitHandler={this.props.plantSubmitHandler}
                                user={this.props.user}
                            />
                        </>
                    )
                }} />
            </Switch>
        )
    }
}

export default PlantList