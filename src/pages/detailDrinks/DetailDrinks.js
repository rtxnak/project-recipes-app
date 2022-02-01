import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/button/Button';
import fetchAPI from '../../services/fetchAPI';

const CUT = '/drinks/';
function DetailDrink() {
  const [returnAPIDrink, setReturnAPIDrink] = useState('');
  const location = useLocation();
  const sliceLocationId = location.pathname.split(CUT)[1];
  // console.log(location.pathname);
  console.log(sliceLocationId);
  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchCocktailById', sliceLocationId);
      setReturnAPIDrink(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);
  console.log(returnAPIDrink);
  return (
    <div>
      {
        returnAPIDrink
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ returnAPIDrink.drinks[0].strDrinkThumb }
            alt="img"
          />
          <title
            data-testid="recipe-title"
          >
            { returnAPIDrink.drinks[0].strDrink }
          </title>
          <Button
            testid="share-btn"
            label="share"
            type="button"
          />
          <Button
            testid="favorite-btn"
            label="favorite"
            type="button"
          />
          <span data-testid="recipe-category" />
          <span data-testid="$ {index}-ingredient-name-and-measure" />
          <span data-testid="instructions" />
          <span data-testid="$ {index}-recomendation-card" />
          <Button
            testid="start-recipe-btn"
            label="Start Recipe"
            type="button"
          />
        </div>
      )
      }
    </div>
  );
}

export default DetailDrink;
