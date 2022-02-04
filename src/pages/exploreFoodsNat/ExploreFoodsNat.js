import React, { useEffect, useState, useContext } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import fetchNationalitiesAPI from '../../services/fetchAPINationalities';
import fetchRecipesNationalitiesAPI from '../../services/fetchAPIByNationalities';
import fetchAPI from '../../services/fetchAPI';
import CardExplore from '../../components/cardExplore/CardExplore';
import GlobalContext from '../../context/GlobalContext';

function ExploreFoodsNat() {
  const [filter, setFilter] = useState('All');
  const [nationalitiesAPI, setNationalitiesAPI] = useState('');
  const TWELVE = 12;

  // dropdown
  const handleValueFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  // código do Foods page
  const {
    filterResult,
    setfilterResult,
  } = useContext(GlobalContext);

  const [recipes, setRecipes] = useState('');

  const mainScreenMeals = async () => {
    const mainScreenRecipes = await fetchAPI('fetchMealByName', '');
    setRecipes(mainScreenRecipes);
  };

  const filterByCategory = async (category) => {
    if (category === 'All') {
      const mainScreenRecipes = await fetchAPI('fetchMealByName', '');
      setfilterResult(mainScreenRecipes);
      setFilter('');
    } else {
      const responseAPI = await fetchRecipesNationalitiesAPI(filter);
      setfilterResult(responseAPI);
    }
  };

  useEffect(() => {
    if (filter === 'All') {
      mainScreenMeals();
    }
    setRecipes(filterResult);
  }, []);

  useEffect(() => {
    setRecipes(filterResult);
  }, [filterResult]);

  // dropdown

  useEffect(() => {
    const getNationalities = async () => {
      const result = await fetchNationalitiesAPI();
      setNationalitiesAPI(result);
    };
    getNationalities();
    filterByCategory();
  }, []);

  return (
    <div>
      <Header
        label="Explore Nationalities"
        testid="page-title"
      />
      { nationalitiesAPI && (
        <label htmlFor="nationalities">
          <select
            data-testid="explore-by-nationality-dropdown"
            name="nationalities"
            onChange={ handleValueFilter }
            value={ filter }
          >
            <option
              value=""
            >
              All
            </option>
            { nationalitiesAPI.meals.map((value) => (
              <option
                key={ value.strArea }
                value={ value.strArea }
                data-testid={ `${value.strArea}-option` }
              >
                { value.strArea }
              </option>
            )) }
          </select>
        </label>
      ) }
      { recipes && recipes.meals.slice(0, TWELVE)
        .map((value, i) => (
          <CardExplore
            index={ i }
            key={ i }
            name={ value.strMeal }
            id={ value.idMeal }
            img={ value.strMealThumb }
          />
        )) }
      <Footer />
    </div>
  );
}

export default ExploreFoodsNat;
