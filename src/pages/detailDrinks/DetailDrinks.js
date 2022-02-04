import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';
import './DetailDrinks.css';
import {
  filterIngredientsFunc,
  filterMeasuresFunc,
  youtubeLinkConverter,
} from './FuncDetailDrinks';
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
<<<<<<< HEAD
=======
  // console.log(returnAPIDrink);
>>>>>>> d880f48713b2c81846c1fcd83fac503489d2642e

  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };
  const history = useHistory();
  const [favoriteButt, setFavoriteButt] = useState(false);

  const favoriteDrink = () => {
    const arrayRecipe = localStorage.getItem('favoriteRecipes');
<<<<<<< HEAD
=======
    // console.log(arrayRecipe);
>>>>>>> d880f48713b2c81846c1fcd83fac503489d2642e
    const {
      idDrink,
      strCategory,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
    } = returnAPIDrink.drinks[0];
    const newRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    const favoriteRecipes = arrayRecipe
      ? [...JSON.parse(arrayRecipe), newRecipe] : [newRecipe];
<<<<<<< HEAD
=======
    // console.log(newRecipe);
>>>>>>> d880f48713b2c81846c1fcd83fac503489d2642e
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const removeFavoriteDrink = () => {
    const newRecipe = '';
    localStorage.setItem('favoriteRecipes', JSON.stringify(...newRecipe, newRecipe));
  };

  useEffect(() => {
    const verifyIdLocalstorage = () => {
      const getRecipeLocalstorage = localStorage.getItem('favoriteRecipes');
      const recipeIdLocalstorage = JSON.parse(getRecipeLocalstorage);
      if (returnAPIDrink && recipeIdLocalstorage) {
        recipeIdLocalstorage.map((value) => returnAPIDrink.drinks[0].idDrink === value.id
          && setFavoriteButt(true));
      }
    };
    verifyIdLocalstorage();
  }, [returnAPIDrink]); // isFavorite
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
            { linkCopy ? <p>Link copied!</p> : null }
            { !favoriteButt
              ? (
                <button
                  type="button"
                  onClick={ () => {
                    favoriteDrink();
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
                    removeFavoriteDrink();
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
            <p data-testid="recipe-category">{ returnAPIDrink.drinks[0].strAlcoholic }</p>
            <IngredientsList
              ingredients={ filterIngredientsFunc(returnAPIDrink) }
              measures={ filterMeasuresFunc(returnAPIDrink) }
            />
            <div data-testid="instructions">
              { returnAPIDrink.drinks[0].strInstructions }
            </div>
            { youtubeLinkConverter && (
              <div>
                <iframe
                  data-testid="video"
                  width="450"
                  height="280"
                  src={ youtubeLinkConverter(returnAPIDrink) }
                  frameBorder="0"
                  allow="accelerometer; autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            ) }
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
