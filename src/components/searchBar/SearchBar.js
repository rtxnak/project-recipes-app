import React from 'react';
import Button from '../button/Button';
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
      <label htmlFor="ingredients">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredients"
          name="firstLetter"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          value="name"
          name="firstLetter"
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="firstLetter"
          name="firstLetter"
        />
      </label>

      <Button
        label="Search"
        testid="exec-search-btn"
        // onClick
        // disabled=""
      />
    </div>
  );
}

export default SearchBar;
