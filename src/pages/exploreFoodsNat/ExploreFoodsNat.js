import React, { useEffect,
  useState,
} from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import fetchNationalitiesAPI from '../../services/fetchAPINationalities';
import fetchRecipesNationalitiesAPI from '../../services/fetchAPIByNationalities';
import fetchAPI from '../../services/fetchAPI';
import CardExplore from '../../components/cardExplore/CardExplore';

function ExploreFoodsNat() {
  const [filter, setFilter] = useState('All');
  const [nationalitiesAPI, setNationalitiesAPI] = useState('');
  const [recipes, setRecipes] = useState('');
  const TWELVE = 12;

  const mainScreenMeals = async () => {
    const mainScreenRecipes = await fetchAPI('fetchMealByName', '');
    setRecipes(mainScreenRecipes);
  };

  const filterByNationality = async (NationalityValue) => {
    const responseAPI = await fetchRecipesNationalitiesAPI(NationalityValue);
    setRecipes(responseAPI);
  };

  useEffect(() => {
    if (filter === 'All') {
      mainScreenMeals();
    } else {
      filterByNationality(filter);
    }
  }, [filter]);

  // dropdown
  const handleValueFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  useEffect(() => {
    const getNationalities = async () => {
      const result = await fetchNationalitiesAPI();
      setNationalitiesAPI(result);
    };
    getNationalities();
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
              value="All"
              data-testid="All-option"
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
      { recipes && recipes.meals.slice(0, TWELVE).map((value, i) => (
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
