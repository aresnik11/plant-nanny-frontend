import React from 'react'
import Note from './Note'
import NewNote from './NewNote'
import Search from './Search'
import NoteList from '../Containers/NoteList'

class Plant extends React.Component {
    state = {
        searchTerm: ''
    }

    makeNotes = () => {
        let filteredNotes = this.props.notes.filter(note => note.content.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredNotes.map(note => <Note key={note.id} note={note} deleteNote={this.props.deleteNote}/>)
    }
    
    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <>
                <div className="plant-page">
                    <div>
                        <h2>{this.props.plant.name}</h2>
                        <h3>{this.props.plant.species}</h3>
                        <img alt={this.props.plant.name} src={this.props.plant.image} />
                        <h4>Water: {this.props.plant.water}</h4>
                        <h4>Light: {this.props.plant.light}</h4>
                        <h4>Color: {this.props.plant.color}</h4>
                        <br/>
                        <button className="ui green basic button" onClick={() => this.props.deletePlant(this.props.plant)}>Delete Plant</button>
                    </div>
                    <div>
                        <h1>Notes</h1>
                        <br/>
                        <Search searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} type="Notes" />
                        <br />
                        <div className="ui cards">
                            {this.makeNotes()}
                        </div>
                        <br/><br/>
                        <NewNote noteSubmitHandler={this.props.noteSubmitHandler} plant={this.props.plant} user={this.props.user} />
                    </div>
                </div>
            </>
        )
    }
}

export default Plant