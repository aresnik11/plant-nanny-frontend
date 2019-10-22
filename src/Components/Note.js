import React from 'react'

const Note = (props) => {
    return (
        <div className="note">
            <div className="ui card">
                <div className="content">
                    <div className="header">{props.note.created_at.slice(0,10)}</div>
                    <div class="description">{props.note.content}</div>
                </div>
            </div>
        </div>
    )
}

export default Note