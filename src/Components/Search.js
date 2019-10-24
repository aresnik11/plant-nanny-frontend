import React from 'react'

const Search = (props) => {
    return (
        <div>
            <h1>Search {props.type}</h1>
            <div className="ui left icon input">
                <i className="search green icon"></i>
                <input type="text" name="search" placeholder="Search..." value={props.searchTerm} onChange={props.searchChangeHandler} />
            </div>
        </div>
    )
}

export default Search