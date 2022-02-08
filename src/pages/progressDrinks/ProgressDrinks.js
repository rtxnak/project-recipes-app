import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import IngredientsCheck from '../../components/IngredientsCheck/IngredientsCheck';
import GlobalContext from '../../context/GlobalContext';

import {
  filterIngredientsFunc,
  filterMeasuresFunc,
} from '../detailDrinks/FuncDetailDrinks';

function ProgressDrinks({ match }) {
  const [returnAPIDrink, setReturnAPIDrink] = useState('');
  const [checkboxList, setCheckboxList] = useState({});
  const {
    handleRecipeStarted,
  } = useContext(GlobalContext);

  const { params: { id } } = match;

  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchCocktailById', id);
      setReturnAPIDrink(result);
    };
    returnFetchApi();
  }, [id]);

  useEffect(() => {
    const ingredientListCreator = async () => {
      const result = await fetchAPI('fetchCocktailById', id);
      const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ingredientList = filterIngredientsFunc(result);
      if (!getRecipes || Object.keys(getRecipes.cocktails[id]).length === 0) {
        const state = ingredientList.reduce((obj, ingredient) => ({
          ...obj,
          [ingredient]: false,
        }), {});
        setCheckboxList(state);
        handleRecipeStarted(result.drinks[0], state);
      } else {
        setCheckboxList(getRecipes.cocktails[id]);
      }
    };
    ingredientListCreator();
  }, []);

  const history = useHistory();
  function redirectFinish() {
    history.push('/done-recipes');
  }

  const handleChangeCheckBox = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientList = getRecipes.cocktails[id];
    const obj = {
      ...ingredientList,
      [target.name]: value,
    };
    setCheckboxList(obj);
    handleRecipeStarted(returnAPIDrink.drinks[0], obj);
  };

  const finishRecipeIsDisabled = () => Object.values(checkboxList)
    .every((ingredient) => ingredient);

  return (
    <div>
      {
        returnAPIDrink
        && (
          <div>
            <h2>Drinks in Progress</h2>
            <img
              data-testid="recipe-photo"
              alt="Img"
              src={ returnAPIDrink.drinks[0].strDrinkThumb }
              width="200px"
            />
            <h2 data-testid="recipe-title">{returnAPIDrink.drinks[0].strDrink}</h2>

            <h4 data-testid="recipe-category">{returnAPIDrink.drinks[0].strAlcoholic}</h4>

            <button
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>

            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>

            <p data-testid="instructions">{returnAPIDrink.drinks[0].strInstructions}</p>

            {Object.values(checkboxList).length > 0 && (
              <IngredientsCheck
                ingredients={ filterIngredientsFunc(returnAPIDrink) }
                measures={ filterMeasuresFunc(returnAPIDrink) }
                handleChange={ handleChangeCheckBox }
                checkboxList={ checkboxList }
              />
            )}

            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="finish-drink-btn"
              onClick={ () => redirectFinish() }
              disabled={ !finishRecipeIsDisabled() }
            >
              Finish Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}

ProgressDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProgressDrinks.defaultProps = {
  match: {},
};

export default ProgressDrinks;
