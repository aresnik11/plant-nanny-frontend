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
                    <div>
                        <Search searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} type="Notes" />
                        <br/><br/>
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