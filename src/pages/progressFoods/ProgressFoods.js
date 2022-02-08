import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import IngredientsCheck from '../../components/IngredientsCheck/IngredientsCheck';
import GlobalContext from '../../context/GlobalContext';

import {
  filterIngredientsFunc,
  filterMeasuresFunc,
} from '../detailFoods/FuncDetailFoods';

function ProgressFoods({ match }) {
  const [returnAPI, setReturnAPI] = useState('');
  const [checkboxList, setCheckboxList] = useState({});
  const {
    handleRecipeStarted,
  } = useContext(GlobalContext);

  const { params: { id } } = match;

  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', id);
      setReturnAPI(result);
    };
    returnFetchApi();
  }, [id]);

  useEffect(() => {
    const ingredientListCreator = async () => {
      const result = await fetchAPI('fetchMealById', id);
      const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ingredientList = filterIngredientsFunc(result);
      if (!getRecipes || Object.keys(getRecipes.meals[id]).length === 0) {
        const state = ingredientList.reduce((obj, ingredient) => ({
          ...obj,
          [ingredient]: false,
        }), {});
        setCheckboxList(state);
        handleRecipeStarted(result.meals[0], state);
      } else {
        setCheckboxList(getRecipes.meals[id]);
      }
    };
    ingredientListCreator();
  }, []);

  const history = useHistory();
  function redirectFinish() {
    history.push('/done-recipes');
    const arrayRecipeDone = localStorage.getItem('doneRecipes');
    const now = new Date();
    const dataDoneRecipe = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
    const {
      idMeal, strCategory, strMeal, strMealThumb, strTags, strArea,
    } = returnAPI.meals[0];
    const tagsArray = strTags.split(',');
    const doneRecipes = {
      id: idMeal,
      type: 'food',
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: dataDoneRecipe,
      tags: tagsArray,
      nationality: strArea,
    };

    const doneRecipesLocalstorage = arrayRecipeDone
      ? [...JSON.parse(arrayRecipeDone), doneRecipes] : [doneRecipes];
    localStorage.setItem('doneRecipes',
      JSON.stringify(doneRecipesLocalstorage));
  }

  const handleChangeCheckBox = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientList = getRecipes.meals[id];
    const obj = {
      ...ingredientList,
      [target.name]: value,
    };
    setCheckboxList(obj);
    handleRecipeStarted(returnAPI.meals[0], obj);
  };

  const finishRecipeIsDisabled = () => Object.values(checkboxList)
    .every((ingredient) => ingredient);

  return (
    <div>
      {
        returnAPI
        && (
          <div>
            <h2>Foods in Progress</h2>
            <img
              data-testid="recipe-photo"
              alt="Img"
              src={ returnAPI.meals[0].strMealThumb }
              width="200px"
            />
            <h2 data-testid="recipe-title">{returnAPI.meals[0].strMeal}</h2>

            <h4 data-testid="recipe-category">{returnAPI.meals[0].strCategory}</h4>

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

            <p data-testid="instructions">{returnAPI.meals[0].strInstructions}</p>

            {Object.values(checkboxList).length > 0 && (
              <IngredientsCheck
                ingredients={ filterIngredientsFunc(returnAPI) }
                measures={ filterMeasuresFunc(returnAPI) }
                handleChange={ handleChangeCheckBox }
                checkboxList={ checkboxList }
              />
            )}

            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="finish-food-btn"
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

ProgressFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProgressFoods.defaultProps = {
  match: {},
};

export default ProgressFoods;
