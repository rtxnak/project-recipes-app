import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Button from '../../components/button/Button';
import fetchAPI from '../../services/fetchAPI';
import './DetailFood.css';

const CUT = '/foods/';
function DetailFoods() {
  const [returnAPI, setReturnAPI] = useState('');
  const location = useLocation();
  const sliceLocationId = location.pathname.split(CUT)[1];
  // console.log(location.pathname);
  // console.log(sliceLocationId);
  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', sliceLocationId);
      setReturnAPI(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);
  console.log(returnAPI);

  /* const filterIngredients = (object) => (
    Object.keys(object.meals)
      .filter((value) => value[0].includes('strIngredient') && value[1]
        .map((ingredient) => ingredient[1]))
  );
  console.log(filterIngredients(returnAPI)); */
  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };

  const history = useHistory();
  const [favoriteButt, setFavoriteButt] = useState(false);
  /* const [isFavorite, setIsFavorite] = useState('');

  const checkIsFavorite = () => {
    const getRecipeLocalstorage = localStorage.getItem('favoriteRecipes');
    setIsFavorite(getRecipeLocalstorage);
  };
  useEffect(() => {
    checkIsFavorite();
  }, []); */

  const favoriteFood = () => {
    const arrayRecipe = localStorage.getItem('favoriteRecipes');
    console.log(arrayRecipe);
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = returnAPI.meals[0];
    const newRecipe = {
      id: idMeal,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    const favoriteRecipes = arrayRecipe
      ? [...JSON.parse(arrayRecipe), newRecipe] : [newRecipe];
    console.log(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const removeFavoriteFood = () => {
    const newRecipe = '';
    localStorage.setItem('favoriteRecipes', JSON.stringify(...newRecipe, newRecipe));
  };

  useEffect(() => {
    const verifyIdLocalstorage = () => {
      const getRecipeLocalstorage = localStorage.getItem('favoriteRecipes');
      if (returnAPI && getRecipeLocalstorage.length > 0) {
        const recipeIdLocalstorage = JSON.parse(getRecipeLocalstorage);
        console.log(recipeIdLocalstorage);
        recipeIdLocalstorage.map((value) => returnAPI.meals[0].idMeal === value.id
          && setFavoriteButt(true));
      }
    };
    verifyIdLocalstorage();
  }, [returnAPI]); // isFavorite
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
            { linkCopy ? <p>Link copied!</p> : null }
            { !favoriteButt
              ? (
                <button
                  type="button"
                  onClick={ () => {
                    favoriteFood();
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
                    removeFavoriteFood();
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
            <p data-testid="recipe-category">{ returnAPI.meals[0].strCategory }</p>
            <span data-testid="$ {index}-ingredient-name-and-measure" />
            <span data-testid="instructions" />
            <img data-testid="video" alt="alt" />
            <span data-testid="$ {index}-recomendation-card" />
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
