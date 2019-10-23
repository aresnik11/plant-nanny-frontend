import React from 'react'
import Note from './Note'
import NewNote from './NewNote'

const Plant = (props) => {
    const makeNotes = () => {
        return props.notes.map(note => <Note key={note.id} note={note} />)
    }

    return (
        <>
            <div className="plant-page">
                <div>
                    <h2>{props.plant.name}</h2>
                    <h3>{props.plant.species}</h3>
                    <img alt={props.plant.name} src={props.plant.image} />
                    <h4>Water: {props.plant.water}</h4>
                    <h4>Light: {props.plant.light}</h4>
                    <h4>Color: {props.plant.color}</h4>
                    <br/>
                    <button className="ui green basic button" onClick={() => props.deletePlant(props.plant)}>Delete Plant</button>
                </div>
                <div>
                    <h1>Notes</h1>
                    <br/>
                    <div className="ui cards">
                        {makeNotes()}
                    </div>
                    <br/><br/>
                    <NewNote noteSubmitHandler={props.noteSubmitHandler} plant={props.plant} user={props.user} />
                </div>
            </div>
        </>
    )
}

export default Plant