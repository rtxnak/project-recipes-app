import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../services/fetchAPI';
import IngredientsCheck from '../../components/IngredientsCheck/IngredientsCheck';

import {
  filterIngredientsFunc,
  filterMeasuresFunc,
} from '../detailDrinks/FuncDetailDrinks';

function ProgressDrinks({ match }) {
  const [returnAPIDrink, setReturnAPIDrink] = useState('');

  const { params: { id } } = match;

  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchCocktailById', id);
      setReturnAPIDrink(result);
    };
    returnFetchApi();
  }, [id]);
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

            <IngredientsCheck
              ingredients={ filterIngredientsFunc(returnAPIDrink) }
              measures={ filterMeasuresFunc(returnAPIDrink) }
            />

            <button
              type="button"
              data-testid="finish-recipe-btn"
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
