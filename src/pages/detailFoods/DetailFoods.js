import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';
import './DetailFood.css';

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

  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };

  const history = useHistory();
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
            <button
              data-testid="share-btn"
              type="button"
              onClick={ linkC }
            >
              <img src={ shareImg } alt="share icon" />
            </button>
            {linkCopy ? <p>Link copied!</p> : null}
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
              className="buttonstart"
              onClick={ () => history.push(`/foods/${sliceLocationId}/in-progress`) }
            />
          </div>
        )
      }
    </div>
  );
}

export default DetailFoods;
