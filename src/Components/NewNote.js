import React from 'react'

class NewNote extends React.Component {
    state = {
        content: "",
        user_id: this.props.user.id,
        plant_id: this.props.plant.id
    }

    newNoteInputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    newNoteSubmitHandler = (e) => {
        e.preventDefault()
        this.props.noteSubmitHandler(this.state)
        this.setState({
            content: ""
        })
    }

    render() {
        return (
            <div>
                <h1>New Note</h1>
                <form onSubmit={this.newNoteSubmitHandler}>
                    <textarea name="content" placeholder="content" value={this.state.content} onChange={this.newNoteInputHandler}/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default NewNote