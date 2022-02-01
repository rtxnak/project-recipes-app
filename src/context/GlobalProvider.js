import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import fetchAPI from '../services/fetchAPI';
import Card from '../components/card/card';

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

  const handleSearchMeals = (filterData) => {
    // console.log(filterData.meals);
    const alert = 'Sorry, we haven\'t found any recipes for these filters.';
    if (!filterData.meals) {
      global.alert(alert);
    } else {
      setfilterResult(filterData);
      // redirect caso encontre somente um resultado.
      if (location.pathname.includes('foods') && filterData.meals.length === 1) {
        history.push(`/foods/${filterData.meals[0].idMeal}`);
      }
    }
  };

  const handleSearchCocktails = (filterData) => {
    // console.log(filterData);
    const alert = 'Sorry, we haven\'t found any recipes for these filters.';
    if (!filterData.drinks) {
      global.alert(alert);
    } else {
      setfilterResult(filterData);
      // redirect caso encontre somente um resultado.
      if (location.pathname.includes('drinks') && filterData.drinks.length === 1) {
        history.push(`/drinks/${filterData.drinks[0].idDrink}`);
      }
    }
  };

  const handleSearchClick = () => {
    if (location.pathname === '/foods') {
      if (radioSelected === 'ingredients') {
        fetchAPI('fetchMealByIngredient', search)
          .then((data) => handleSearchMeals(data));
      }
      if (radioSelected === 'name') {
        fetchAPI('fetchMealByName', search)
          .then((data) => handleSearchMeals(data));
      }
      if (radioSelected === 'firstLetter') {
        fetchAPI('fetchMealByFirstLetter', search)
          .then((data) => handleSearchMeals(data));
      }
    }
    if (location.pathname === '/drinks') {
      if (radioSelected === 'ingredients') {
        fetchAPI('fetchCocktailByIngredient', search)
          .then((data) => handleSearchCocktails(data));
      }
      if (radioSelected === 'name') {
        fetchAPI('fetchCocktailByName', search)
          .then((data) => handleSearchCocktails(data));
      }
      if (radioSelected === 'firstLetter') {
        fetchAPI('fetchCocktailByFirstLetter', search)
          .then((data) => handleSearchCocktails(data));
      }
    }
  };

  const renderFoodRecipes = (arrayOfRecipes) => {
    const MAX_MEALS = 12;
    return (
      <div>
        { arrayOfRecipes
          .slice(0, MAX_MEALS)
          .map((recipe, i) => (
            <Card
              key={ recipe.idMeal }
              index={ i }
              name={ recipe.strMeal }
              img={ recipe.strMealThumb }
              id={ recipe.idMeal }
            />
          )) }
      </div>);
  };

  const renderDrinkRecipes = (arrayOfRecipes) => {
    // console.log(arrayOfRecipes);
    const MAX_DRINKS = 12;
    return (
      <div>
        { arrayOfRecipes
          .slice(0, MAX_DRINKS)
          .map((recipe, i) => (
            <Card
              key={ recipe.idDrink }
              index={ i }
              name={ recipe.strDrink }
              img={ recipe.strDrinkThumb }
              id={ recipe.idDrink }
            />
          )) }
      </div>);
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
    setfilterResult,
    renderFoodRecipes,
    renderDrinkRecipes,
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
