import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import fetchAPI from '../services/fetchAPI';

export default function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLogin, setButtonLogin] = useState({ disabledButt: true });
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setBySearch] = useState('');
  const [radioSelected, setRadioSelected] = useState('');
  const [filterResult, setfilterResult] = useState('');

  const validateButton = () => {
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordLength = 6;
    if (emailValid && password.length >= passwordLength) {
      setButtonLogin({ disabledButt: false });
    } else {
      setButtonLogin({ disabledButt: true });
    }
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    validateButton();
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    validateButton();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const location = useLocation();
  const history = useHistory();

  const handleSearch = (filterData) => {
    setfilterResult(filterData);
    console.log(filterData);
    // redirect caso encontre somente um resultado.
    if (location.pathname.includes('foods') && filterData.meals.length === 1) {
      history.push(`/foods/${filterData.meals[0].idMeal}`);
    }
    if (location.pathname.includes('drinks') && filterData.drinks.length === 1) {
      history.push(`/drinks/${filterData.drinks[0].idDrink}`);
    }
  };

  const handleSearchClick = () => {
    if (location.pathname === '/foods') {
      if (radioSelected === 'ingredients') {
        fetchAPI('fetchMealByIngredient', search)
          .then((data) => handleSearch(data));
      }
      if (radioSelected === 'name') {
        fetchAPI('fetchMealByName', search)
          .then((data) => handleSearch(data));
      }
      if (radioSelected === 'firstLetter') {
        fetchAPI('fetchMealByFirstLetter', search)
          .then((data) => handleSearch(data));
      }
    }
    if (location.pathname === '/drinks') {
      if (radioSelected === 'ingredients') {
        fetchAPI('fetchCocktailByIngredient', search)
          .then((data) => handleSearch(data));
      }
      if (radioSelected === 'name') {
        fetchAPI('fetchCocktailByName', search)
          .then((data) => handleSearch(data));
      }
      if (radioSelected === 'firstLetter') {
        fetchAPI('fetchCocktailByFirstLetter', search)
          .then((data) => handleSearch(data));
      }
    }
  };

  const contextValue = {
    handleEmail,
    email,
    handlePassword,
    password,
    buttonLogin,
    setButtonLogin,
    handleClick,
    showSearchBar,
    setShowSearchBar,
    search,
    setBySearch,
    radioSelected,
    setRadioSelected,
    handleSearchClick,
    filterResult,
  };
  return (
    <GlobalContext.Provider value={ contextValue }>
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
