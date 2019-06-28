import React from 'react';

const Search = (props) => {

    return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input onChange={(event)=>{props.onChange(event)}}/>
      <button onClick={()=> {props.onSearch()}}> Add Repos </button>
    </div>
    )
}

export default Search;