import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import NewNote from './NewNote'

const Plant = (props) => {
    const makeNotes = () => {
        return props.notes.map(note => <Note key={note.id} note={note} />)
    }
    return (
        <>
        {props.plantShow ? (
            <>
                <div>
                    <h2>{props.plant.name}</h2>
                    <h3>{props.plant.species}</h3>
                    <img alt={props.plant.name} src={props.plant.image} />
                    <h4>{props.plant.water}</h4>
                    <h4>{props.plant.light}</h4>
                    <h4>{props.plant.color}</h4>
                    {makeNotes()}
                </div>
                <div>
                    <NewNote noteSubmitHandler={props.noteSubmitHandler} plant={props.plant} />
                </div>
            </>
        ) : (
            <Link to={`/plants/${props.plant.id}`}>
                <div>
                    <h2>{props.plant.name}</h2>
                    <h3>{props.plant.species}</h3>
                    <img alt={props.plant.name} src={props.plant.image} />
                </div>
            </Link>
        )}
        </>
    )
}

export default Plant