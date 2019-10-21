import React from 'react'

class NewPlant extends React.Component {
    state = {
        name: "",
        species: "",
        image: "",
        water: "",
        light: "",
        color: "",
        user_id: 1
    }

    newPlantInputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    newPlantSubmitHandler = (e) => {
        e.preventDefault()
        this.props.plantSubmitHandler(this.state)
        this.setState({
            name: "",
            species: "",
            image: "",
            water: "",
            light: "",
            color: ""
        })
    }

    render() {
        return (
            <div>
                <h1>New Plant</h1>
                <form onSubmit={this.newPlantSubmitHandler}>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.newPlantInputHandler}/>
                    <input type="text" name="species" placeholder="species" value={this.state.species} onChange={this.newPlantInputHandler}/>
                    <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.newPlantInputHandler}/>
                    <input type="text" name="water" placeholder="water" value={this.state.water} onChange={this.newPlantInputHandler}/>
                    <input type="text" name="light" placeholder="light" value={this.state.light} onChange={this.newPlantInputHandler}/>
                    <input type="text" name="color" placeholder="color" value={this.state.color} onChange={this.newPlantInputHandler}/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default NewPlant