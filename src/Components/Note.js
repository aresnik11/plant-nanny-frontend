import React from 'react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'

const Note = (props) => {
    return (
        <div className="note">
            <div className="ui green card">
                {/* creates x button, on click deletes the note */}
                <div className="right floated">
                    <i className="right floated x green icon" onClick={() => props.deleteNote(props.note)}></i>
                </div>
                <div className="content">
                    {/* formats created_at time in EST and only shows M/D h:mm */}
                    <div className="header">{moment(props.note.created_at).format("M/D h:mma")}</div>
                    {/* only render plant name and link to plant if we are not on the plant page */}
                    {props.plant
                    ?
                    null
                    :
                    <div className="meta">
                        <Link to={`/plants/${props.note.plant.id}`}>
                            <span>{props.note.plant.name}</span>
                        </Link>
                    </div>}
                    <div className="description">{props.note.content}</div>
                </div>
            </div>
        </div>
    )
}

export default Note