import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/button/Button';
import fetchAPI from '../../services/fetchAPI';

const FIVE = -5;
function DetailFoods() {
  const [returnAPI, setReturnAPI] = useState('');
  const location = useLocation();
  const sliceLocationId = location.pathname.slice(FIVE);
  // console.log(sliceLocationId);
  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', sliceLocationId);
      setReturnAPI(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);
  // console.log(returnAPI.meals);

  /* const filterIngredients = (object) => (
    Object.keys(object.meals)
      .filter((value) => value[0].includes('strIngredient') && value[1]
        .map((ingredient) => ingredient[1]))
  );
  console.log(filterIngredients(returnAPI)); */

  return (
    <div>
      {
        returnAPI
        && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ returnAPI.meals[0].strMealThumb }
              alt="img"
            />
            <title
              data-testid="recipe-title"
            >
              { returnAPI.meals[0].strMeal }
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
            <p data-testid="recipe-category">{returnAPI.meals[0].strCategory}</p>
            <span data-testid="$ {index}-ingredient-name-and-measure" />
            <span data-testid="instructions" />
            <img data-testid="video" alt="alt" />
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

export default DetailFoods;
