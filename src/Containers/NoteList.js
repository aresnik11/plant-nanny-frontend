import React from 'react'
import Note from '../Components/Note'
import Search from '../Components/Search'

class NoteList extends React.Component {
    state = {
        searchTerm: ""
    }

    makeNotes = () => {
        let filteredNotes = this.props.notes.filter(note => note.content.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredNotes.map(note => <Note key={note.id} note={note} noteList searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} deleteNote={this.props.deleteNote}/>)
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <>
                {this.props.notes.length > 0 ? (
                    <>
                        <Search searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} type="Notes" />
                        <br/><br/>
                        <div className="ui cards">
                            {this.makeNotes()}
                        </div>
                    </>
                ) : (<h1>Add notes from your plant pages</h1>)
                }
            </>
        )
    }
}

export default NoteList