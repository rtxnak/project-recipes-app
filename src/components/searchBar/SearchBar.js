import React, { useContext } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import GlobalContext from '../../context/GlobalContext';
import fetchAPI from '../../services/fetchAPI';

function SearchBar() {
  const {
    search,
    setBySearch,
    radioSelected,
    setRadioSelected,
  } = useContext(GlobalContext);

  const handleSearchClick = () => {
    if (radioSelected === 'ingredients') {
      fetchAPI('fetchMealByIngredient', search)
        .then((data) => console.log(data));
    }
    if (radioSelected === 'name') {
      fetchAPI('fetchMealByName', search)
        .then((data) => console.log(data));
    }
    if (radioSelected === 'firstLetter') {
      fetchAPI('fetchMealByFirstLetter', search)
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <Input
        placeholder="Search Recipe"
        name="searchBar"
        onChange={ ({ target: { value } }) => setBySearch(value) }
        type="text"
        testid="search-input"
        value={ search }
      />
      <label htmlFor="ingredients">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredients"
          name="searchRadios"
          onChange={ ({ target: { value } }) => setRadioSelected(value) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          value="name"
          name="searchRadios"
          onChange={ ({ target: { value } }) => setRadioSelected(value) }
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="firstLetter"
          name="searchRadios"
          onChange={ ({ target: { value } }) => setRadioSelected(value) }
        />
      </label>

      <Button
        label="Search"
        testid="exec-search-btn"
        onClick={ handleSearchClick }
        // disabled=""
      />
    </div>
  );
}

export default SearchBar;
