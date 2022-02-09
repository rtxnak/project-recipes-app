import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import IngredientsCheck from '../../components/IngredientsCheck/IngredientsCheck';
import GlobalContext from '../../context/GlobalContext';
import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import {
  filterIngredientsFunc,
  filterMeasuresFunc,
  favoriteFood,
  removeFavoriteFood,
} from '../detailFoods/FuncDetailFoods';

import {
  redirectFinishFunc,
  verifyIdLocalstorage,
} from './ProgressFoodsFunc';

function ProgressFoods({ match }) {
  const [returnAPI, setReturnAPI] = useState('');
  const [checkboxList, setCheckboxList] = useState({});
  const {
    handleRecipeStarted,
    linkC,
    linkCopy,
  } = useContext(GlobalContext);

  const { params: { id } } = match;

  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', id);
      setReturnAPI(result);
    };
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
    returnFetchApi();
    ingredientListCreator();
  }, []);

  const history = useHistory();

  function redirectFinish() {
    history.push('/done-recipes');
    redirectFinishFunc(returnAPI);
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

  const [favoriteButt, setFavoriteButt] = useState(false);

  useEffect(() => {
    const verifyIdLocalstorageValue = async () => {
      const response = await verifyIdLocalstorage(id);
      if (response) {
        setFavoriteButt(true);
      }
    };
    verifyIdLocalstorageValue();
  }, []);

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
              data-testid="share-btn"
              type="button"
              onClick={ linkC }
            >
              <img src={ shareImg } alt="share icon" />
            </button>
            { linkCopy ? <p>Link copied!</p> : null }

            { !favoriteButt
              ? (
                <button
                  type="button"
                  onClick={ () => {
                    favoriteFood(returnAPI);
                    setFavoriteButt(true);
                  } }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ whiteHeartIcon }
                    alt="whiteHeartIcon"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={ () => {
                    removeFavoriteFood(id);
                    setFavoriteButt(false);
                  } }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ blackHeartIcon }
                    alt="blackHeartIcon"
                  />
                </button>
              ) }

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
