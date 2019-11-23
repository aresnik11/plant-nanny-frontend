import React from 'react'
import Note from '../Components/Note'
import Search from '../Components/Search'
import NewNote from '../Components/NewNote'

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
        // if there are notes, render search and the notes
        if (this.props.notes.length) {
            return (
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
                    {/* if we're on the plant page, also render new note component */}
                    {this.props.plant
                    ?
                    <>
                        <br/><br/>
                        <NewNote
                            noteSubmitHandler={this.props.noteSubmitHandler}
                            plant={this.props.plant}
                            user={this.props.user}
                        />
                    </>
                    :
                    null}
                </>
            )
        }
        // if there aren't notes, but we are on the plant page, render new note component
        else if (this.props.plant) {
            return (
                <NewNote
                    noteSubmitHandler={this.props.noteSubmitHandler}
                    plant={this.props.plant}
                    user={this.props.user}
                />
            )
        }
        // if there aren't any notes and we're not on the plant page, render this h1
        else {
            return <h1>Add notes from your plant pages</h1>
        }
    }
}

export default NoteList