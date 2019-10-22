import React from 'react'
import Search from '../Components/Search'
import NewPlant from '../Components/NewPlant'
import Plant from '../Components/Plant'
import { Route, Switch } from 'react-router-dom'

class PlantList extends React.Component {
    state = {
        searchTerm: "",
    }

    makePlants = () => {
        let filteredPlants = this.props.plants.filter(plant => plant.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredPlants.map(plant => <Plant key={plant.id} plant={plant} user={this.props.user} />)
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.props.plants.length > 0 ? (
                    <Switch>
                        <Route path="/plants/:id" render={(routerProps) => {
                            let plantId = parseInt(routerProps.match.params.id)
                            let plantObj = this.props.plants.find(plant => plant.id === plantId)
                            let plantNotes = this.props.notes.filter(note => note.plant_id === plantId)
                            return <Plant plant={plantObj} plantShow notes={plantNotes} noteSubmitHandler={this.props.noteSubmitHandler} user={this.props.user} />
                        }} />
                        <Route path="/plants" render={() => {
                            return (
                                <>
                                    <Search searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} />
                                    <NewPlant plantSubmitHandler={this.props.plantSubmitHandler} user={this.props.user} />
                                    <div className="plant-list">
                                        {this.makePlants()}
                                    </div>
                                </>
                            )
                        }} />
                    </Switch>
                ) : (<NewPlant plantSubmitHandler={this.props.plantSubmitHandler} user={this.props.user} />)}
            </div>
        )
    }
}

export default PlantList