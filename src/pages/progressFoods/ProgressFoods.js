import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import IngredientsCheck from '../../components/IngredientsCheck/IngredientsCheck';

import {
  filterIngredientsFunc,
  filterMeasuresFunc,
} from '../detailFoods/FuncDetailFoods';

function ProgressFoods({ match }) {
  const [returnAPI, setReturnAPI] = useState('');

  const { params: { id } } = match;

  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', id);
      setReturnAPI(result);
    };
    returnFetchApi();
  }, [id]);

  const history = useHistory();
  function redirectFinish() {
    history.push('/done-recipes');
  }

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

            <IngredientsCheck
              ingredients={ filterIngredientsFunc(returnAPI) }
              measures={ filterMeasuresFunc(returnAPI) }
            />

            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="finish-food-btn"
              onClick={ () => redirectFinish() }
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
