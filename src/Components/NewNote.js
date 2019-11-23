import React from 'react'

class NewNote extends React.Component {
    state = {
        content: "",
        user_id: this.props.user.id,
        plant_id: this.props.plant.id
    }

    // controlled form
    newNoteInputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    newNoteSubmitHandler = (e) => {
        e.preventDefault()
        // sends submitted values up to send to backend and update state
        this.props.noteSubmitHandler(this.state)
        // resets field back to empty
        this.setState({
            content: ""
        })
    }

    render() {
        return (
            <div>
                <h1>New Note</h1>
                <form className="ui form" onSubmit={this.newNoteSubmitHandler}>
                    <div className="field">
                        <textarea
                            name="content"
                            rows="2"
                            value={this.state.content}
                            onChange={this.newNoteInputHandler}
                        />
                    </div>
                    <button className="ui green basic button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NewNote