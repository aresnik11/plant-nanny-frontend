import React from 'react'

const Note = (props) => {
    return (
        <div className="ui horizontal list">
            <br />
            <div className="item">
                <div className="content">
                    <div className="header">{props.note.created_at.slice(0, 10)}</div>
                    {props.note.content}
                </div>
            </div>
        </div>
    )
}

export default Note