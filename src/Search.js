import React from 'react';
import './Search.css';

const Search = props => (
  <form>
    <input
      onChange={props.onSearch}
      type="text"
      className="form--input_text"
      placeholder="Find a city you want to explore..."
    />
  </form>
);

export default Search;
