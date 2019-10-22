import React from 'react'

class NewPlant extends React.Component {
    state = {
        name: "",
        species: "",
        image: "",
        water: "",
        light: "",
        color: "",
        user_id: this.props.user.id
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
                <form onSubmit={this.newPlantSubmitHandler} className="ui form">
                    <div className="three fields">
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.newPlantInputHandler}/>
                        </div>
                        <div className="field">
                            <label>Species</label>
                            <input type="text" name="species" placeholder="Species" value={this.state.species} onChange={this.newPlantInputHandler}/>
                        </div>
                        <div className="field">
                            <label>Image</label>
                            <input type="text" name="image" placeholder="Image" value={this.state.image} onChange={this.newPlantInputHandler}/>
                        </div>
                    </div>
                    <div className="three fields">
                        <div className="field">
                            <label>Water</label>
                            <input type="text" name="water" placeholder="Water" value={this.state.water} onChange={this.newPlantInputHandler}/>
                        </div>
                        <div className="field">
                            <label>Light</label>
                            <input type="text" name="light" placeholder="Light" value={this.state.light} onChange={this.newPlantInputHandler}/>
                        </div>
                        <div className="field">
                            <label>Color</label>
                            <input type="text" name="color" placeholder="Color" value={this.state.color} onChange={this.newPlantInputHandler}/>
                        </div>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NewPlant