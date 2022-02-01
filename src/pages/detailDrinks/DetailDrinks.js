import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';

const CUT = '/drinks/';
function DetailDrink() {
  const [returnAPIDrink, setReturnAPIDrink] = useState('');
  const location = useLocation();
  const sliceLocationId = location.pathname.split(CUT)[1];
  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchCocktailById', sliceLocationId);
      setReturnAPIDrink(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);

  const filterIngredientsFunc = () => {
    if (returnAPIDrink) {
      const drinksIngredients = Object.entries(returnAPIDrink.drinks[0])
        .filter((key) => key[0].includes('strIngredient') && key[1])
        .map((e) => e[1]);
      return drinksIngredients;
    }
  };

  const filterMeasuresFunc = () => {
    if (returnAPIDrink) {
      const drinksMeasures = Object.entries(returnAPIDrink.drinks[0])
        .filter((key) => key[0].includes('strMeasure') && key[1])
        .map((e) => e[1]);
      return drinksMeasures;
    }
  };

  const youtubeLinkConverter = () => {
    if (returnAPIDrink) {
      const youtubeAPI = returnAPIDrink.drinks[0].strVideo;
      // console.log(youtubeAPI);
      if (youtubeAPI) {
        const youtubeAPISlipted = youtubeAPI.split('https://www.youtube.com/watch?v=')[1];
        // console.log(youtubeAPISlipted);
        return `https://www.youtube.com/embed/${youtubeAPISlipted}`;
      } return null;
    }
  };

  // console.log(returnAPIDrink);

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
            width="200px"
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
          <p data-testid="recipe-category">{returnAPIDrink.drinks[0].strAlcoholic}</p>
          <IngredientsList
            ingredients={ filterIngredientsFunc() }
            measures={ filterMeasuresFunc() }
          />
          <div data-testid="instructions">
            {returnAPIDrink.drinks[0].strInstructions}
          </div>
          {youtubeLinkConverter && (
            <div>
              <iframe
                data-testid="video"
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
          )}
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

export default DetailDrink;
