import React from 'react';
import Input from '../input/Input';

function SearchBar() {
  return (
    <div>
      <Input
        placeholder="Search Recipe"
        name="searchBar"
        // onChange
        type="text"
        testid="search-input"
        value="searchBar"
      />
    </div>
  );
}

export default SearchBar;
