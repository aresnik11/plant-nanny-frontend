import React from 'react'
import Search from '../Components/Search'
import NewPlant from '../Components/NewPlant'
import Plant from '../Components/Plant'
import PlantCard from '../Components/PlantCard'
import Error from '../Components/Error'
import { Route, Switch } from 'react-router-dom'

class PlantList extends React.Component {
    state = {
        searchTerm: "",
    }

    makePlants = () => {
        let filteredPlants = this.props.plants.filter(plant => plant.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredPlants.map(plant => <PlantCard key={plant.id} plant={plant} user={this.props.user} />)
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <>
                {this.props.plants.length > 0 ? (
                    <Switch>
                        <Route path="/plants/:id" render={(routerProps) => {
                            let plantId = parseInt(routerProps.match.params.id)
                            let plantObj = this.props.plants.find(plant => plant.id === plantId)
                            //only render Plant component if we found the plant object
                            if (plantObj) {
                                let plantNotes = this.props.notes.filter(note => note.plant.id === plantId)
                                return <Plant plant={plantObj} notes={plantNotes} noteSubmitHandler={this.props.noteSubmitHandler} user={this.props.user} deletePlant={this.props.deletePlant} deleteNote={this.props.deleteNote} />
                            }
                            //if we couldn't find the plant object, render Error Component
                            else {
                                return <Error />
                            }
                        }} />
                        <Route path="/plants" render={() => {
                            return (
                                <>
                                    <Search searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} type="Plants" />
                                    <br/><br/>
                                    <div className="ui cards">
                                        {this.makePlants()}
                                    </div>
                                    <br/><br/>
                                    <NewPlant plantSubmitHandler={this.props.plantSubmitHandler} user={this.props.user} />
                                </>
                            )
                        }} />
                    </Switch>
                ) : (<NewPlant plantSubmitHandler={this.props.plantSubmitHandler} user={this.props.user} />)}
            </>
        )
    }
}

export default PlantList