import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';

const CUT = '/foods/';
function DetailFoods() {
  const [returnAPI, setReturnAPI] = useState('');
  const location = useLocation();
  const sliceLocationId = location.pathname.split(CUT)[1];
  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', sliceLocationId);
      setReturnAPI(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);

  const filterIngredientsFunc = () => {
    if (returnAPI) {
      const mealsIngredients = Object.entries(returnAPI.meals[0])
        .filter((key) => key[0].includes('strIngredient') && key[1])
        .map((e) => e[1]);
      return mealsIngredients;
    }
  };

  const filterMeasuresFunc = () => {
    if (returnAPI) {
      const mealsMeasures = Object.entries(returnAPI.meals[0])
        .filter((key) => key[0].includes('strMeasure') && key[1])
        .map((e) => e[1]);
      return mealsMeasures;
    }
  };

  const youtubeLinkConverter = () => {
    const youtubeAPI = returnAPI.meals[0].strYoutube;
    const youtubeAPISlipted = youtubeAPI.split('https://www.youtube.com/watch?v=')[1];
    console.log(youtubeAPISlipted);
    return `https://www.youtube.com/embed/${youtubeAPISlipted}`;
  };

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
              width="200px"
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
            <IngredientsList
              ingredients={ filterIngredientsFunc() }
              measures={ filterMeasuresFunc() }
            />
            <div data-testid="instructions">
              {returnAPI.meals[0].strInstructions}
            </div>
            <div data-testid="video">
              <iframe
                width="450"
                height="280"
                src={ youtubeLinkConverter() }
                frameBorder="0"
                allow="accelerometer; autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
            <span data-testid="0-recomendation-card" />
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
