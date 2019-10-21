import React from 'react'

const Search = (props) => {
    return (
        <div>
            <h1>Search</h1>
            <input type="text" name="search" placeholder="search" value={props.searchTerm} onChange={props.searchChangeHandler} />
        </div>
    )
}

export default Search