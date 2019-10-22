import React from 'react'
import Note from '../Components/Note'
import Search from '../Components/Search'

class NoteList extends React.Component {
    state = {
        searchTerm: ""
    }

    makeNotes = () => {
        let filteredNotes = this.props.notes.filter(note => note.content.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filteredNotes.map(note => <Note key={note.id} note={note} searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} />)
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.props.notes.length > 0 ? (
                    <>
                        <Search searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} />
                        {this.makeNotes()}
                    </>
                ) : (<h1>Add a plant first</h1>)
                }
            </div>
        )
    }
}

export default NoteList