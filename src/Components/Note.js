import React from 'react'
import { Link } from 'react-router-dom'

const Note = (props) => {
    return (
        <div className="note">
            <div className="ui green card">
                <div className="right floated">
                    <i className="right floated x green icon" onClick={() => props.deleteNote(props.note)}></i>
                </div>
                <div className="content">
                    <div className="header">{props.note.created_at.slice(0,10)}</div>

                    {/* only render plant name and link if we are on the notelist page */}
                    {props.noteList
                    ?
                    (<div className="meta">
                        <Link to={`/plants/${props.note.plant.id}`}>
                            <span>{props.note.plant.name}</span>
                        </Link>
                    </div>)
                    :
                    (<div></div>)}

                    <div className="description">{props.note.content}</div>
                </div>
            </div>
        </div>
    )
}

export default Note