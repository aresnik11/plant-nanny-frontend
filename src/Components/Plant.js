import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import NewNote from './NewNote'
import NoteList from '../Containers/NoteList'

const Plant = (props) => {
    const makeNotes = () => {
        return props.notes.map(note => <Note key={note.id} note={note} />)
    }

    return (
        <>
        {props.plantShow ? (
            <>
                <div className="plant-page">
                    <div>
                        <h2>{props.plant.name}</h2>
                        <h3>{props.plant.species}</h3>
                        <img alt={props.plant.name} src={props.plant.image} />
                        <h4>{props.plant.water}</h4>
                        <h4>{props.plant.light}</h4>
                        <h4>{props.plant.color}</h4>
                    </div>
                    <div className="ui cards">
                        <NoteList notes={props.notes} />
                    </div>
                </div>
                <div>
                    <NewNote noteSubmitHandler={props.noteSubmitHandler} plant={props.plant} user={props.user} />
                </div>
            </>
        ) : (
            <Link to={`/plants/${props.plant.id}`} className="plant">
                <div className="ui card">
                    <div className="image" id="plant-image">
                        <img src={props.plant.image} alt={props.plant.name}/>
                    </div>
                    <div className="content">
                        <div className="header">{props.plant.name}</div>
                        <div className="description">{props.plant.species}</div>
                    </div>
                </div>
            </Link>
        )}
        </>
    )
}

export default Plant