import React from 'react'

const Note = (props) => {
    return (
        <div>
            <h3>{props.note.created_at}</h3>
            <h4>{props.note.content}</h4>
        </div>
    )
}

export default Note