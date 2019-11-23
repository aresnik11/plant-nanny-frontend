import React from 'react'
import Note from '../Components/Note'
import Search from '../Components/Search'
import NewNote from '../Components/NewNote'
import { Switch, Route } from 'react-router-dom'

class NoteList extends React.Component {
    state = {
        searchTerm: ""
    }

    // controlled search form
    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    // filters notes based on search term, creates a note component for each note in filtered notes
    makeNotes = () => {
        const filteredNotes = this.props.notes.filter(note => note.content.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredNotes.map(note =>
            <Note
                key={note.id}
                note={note}
                plant={this.props.plant}
                searchTerm={this.state.searchTerm}
                searchChangeHandler={this.searchChangeHandler}
                deleteNote={this.props.deleteNote}
            />
        )
    }

    render() {
        return (
            <Switch>
                {/* if we're on the notes page */}
                <Route path="/notes" render={() => {
                    return (
                        <>
                            {/* only render search and notes if there are notes */}
                            {this.props.notes.length
                            ?
                            <>
                                <Search
                                    searchTerm={this.state.searchTerm}
                                    searchChangeHandler={this.searchChangeHandler}
                                    type="Notes"
                                />
                                <br/><br/>
                                <div className="ui cards">
                                    {this.makeNotes()}
                                </div>
                            </>
                            :
                            // if there aren't notes, render this h1
                            <h1>Add notes from your plant pages</h1>}
                        </>
                    )
                }}/>
                {/* if we're on a plant page */}
                <Route path="/plants/:id" render={() => {
                    return (
                        <>
                            {/* only render search and notes if there are notes */}
                            {this.props.notes.length
                            ?
                            <>
                                <Search
                                    searchTerm={this.state.searchTerm}
                                    searchChangeHandler={this.searchChangeHandler}
                                    type="Notes"
                                />
                                <br/><br/>
                                <div className="ui cards">
                                    {this.makeNotes()}
                                </div>
                                <br/><br/>
                            </>
                            :
                            null}
                            {/* render new note no matter what */}
                            <NewNote
                                noteSubmitHandler={this.props.noteSubmitHandler}
                                plant={this.props.plant}
                                user={this.props.user}
                            />
                        </>
                    )
                }}/>
            </Switch>
        )
    }
}

export default NoteList