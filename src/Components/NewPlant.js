import React from 'react'

class NewPlant extends React.Component {
    state = {
        name: "",
        species: "",
        image: "",
        water: "Low",
        light: "Low",
        color: "",
        user_id: this.props.user.id
    }

    // controlled form
    newPlantInputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    newPlantSubmitHandler = (e) => {
        e.preventDefault()
        // sends submitted values up to send to backend and update state
        this.props.plantSubmitHandler(this.state)
        // resets values in form
        this.setState({
            name: "",
            species: "",
            image: "",
            water: "Low",
            light: "Low",
            color: ""
        })
    }

    render() {
        return (
            <div>
                <h1>New Plant</h1>
                <form onSubmit={this.newPlantSubmitHandler} className="ui form">
                    {/* first row of 3 fields for name, species, image */}
                    <div className="three fields">
                        <div className="field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.newPlantInputHandler}
                            />
                        </div>
                        <div className="field">
                            <label>Species</label>
                            <input
                                type="text"
                                name="species"
                                placeholder="Species"
                                value={this.state.species}
                                onChange={this.newPlantInputHandler}
                            />
                        </div>
                        <div className="field">
                            <label>Image</label>
                            <input
                                type="text"
                                name="image"
                                placeholder="Image"
                                value={this.state.image}
                                onChange={this.newPlantInputHandler}
                            />
                        </div>
                    </div>
                    {/* second row of 3 fields for water, light, color. water and light are dropdown fields */}
                    <div className="three fields">
                        <div className="field">
                            <label>Water</label>
                            <select className="ui dropdown" name="water" onChange={this.newPlantInputHandler} value={this.state.water}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Light</label>
                            <select className="ui dropdown" name="light" onChange={this.newPlantInputHandler} value={this.state.light}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>All</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Color</label>
                            <input
                                type="text"
                                name="color"
                                placeholder="Color"
                                value={this.state.color}
                                onChange={this.newPlantInputHandler}
                            />
                        </div>
                    </div>
                    <button className="ui green basic button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NewPlant