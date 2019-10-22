import React from 'react'

const Search = (props) => {
    return (
        <div>
            <h1>Search</h1>
            <div className="ui input">
                <input type="text" name="search" placeholder="Search..." value={props.searchTerm} onChange={props.searchChangeHandler} />
            </div>
        </div>
    )
}

export default Search