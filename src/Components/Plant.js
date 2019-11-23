import React from 'react'

class Plant extends React.Component {
    render() {
        return (
            // plant card including image, name, species, icons with info for light, water, and color, and delete button
            <div className="ui green card plant-info">
                <div className="image">
                    <img alt={this.props.plant.name} src={this.props.plant.image}/>
                </div>
                <div className="content">
                    <div className="header">
                        <h1>{this.props.plant.name}</h1>
                    </div>
                    <div className="description">
                        {this.props.plant.species}
                    </div>
                </div>
                <div className="content">
                    <i className="tint green large icon"></i>
                    {this.props.plant.water}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="sun green large icon"></i>
                    {this.props.plant.light}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="paint brush green large icon"></i>
                    {this.props.plant.color}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="content">
                    <button className="ui green basic button" onClick={() => this.props.deletePlant(this.props.plant)}>Delete Plant</button>
                </div>
            </div>
        )
    }
}

export default Plant