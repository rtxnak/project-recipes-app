import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';
import './DetailDrinks.css';
import RecomendationCard from '../../components/recomendationCard/RecomendationCard';

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

  const history = useHistory();
  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };

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
          <Button
            testid="start-recipe-btn"
            label="Start Recipe"
            type="button"
            className="buttonstart"
            onClick={ () => history.push(`/drinks/${sliceLocationId}/in-progress`) }
          />
          <RecomendationCard />
        </div>
      )
      }
    </div>
  );
}

export default DetailDrink;
