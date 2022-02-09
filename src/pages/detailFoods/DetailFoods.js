import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';
import RecomendationCard from '../../components/recomendationCard/RecomendationCard';
import './DetailFood.css';
import {
  filterIngredientsFunc,
  filterMeasuresFunc,
  youtubeLinkConverter,
  favoriteFood,
  removeFavoriteFood,
} from './FuncDetailFoods';
import GlobalContext from '../../context/GlobalContext';

const CUT = '/foods/';

function DetailFoods() {
  const {
    handleRecipeStarted,
  } = useContext(GlobalContext);

  const [returnAPI, setReturnAPI] = useState('');
  const location = useLocation();
  const history = useHistory();
  const sliceLocationId = location.pathname.split(CUT)[1];

  useEffect(() => {
    const returnFetchApi = async () => {
      const result = await fetchAPI('fetchMealById', sliceLocationId);
      setReturnAPI(result);
    };
    returnFetchApi();
  }, [sliceLocationId]);

  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };

  const [favoriteButt, setFavoriteButt] = useState(false);

  useEffect(() => {
    const verifyIdLocalstorage = () => {
      const getRecipeLocalstorage = localStorage.getItem('favoriteRecipes');
      const recipeIdLocalstorage = JSON.parse(getRecipeLocalstorage);
      if (returnAPI && recipeIdLocalstorage) {
        recipeIdLocalstorage.map((value) => returnAPI.meals[0].idMeal === value.id
          && setFavoriteButt(true));
      }
    };
    verifyIdLocalstorage();
  }, [returnAPI]); // isFavorite

  const startRecipeFunc = (recipe) => {
    handleRecipeStarted(recipe, '');
    history.push(`/foods/${sliceLocationId}/in-progress`);
  };

  const continueRecipeFunc = () => {
    history.push(`/foods/${sliceLocationId}/in-progress`);
  };

  const startOrContinueButton = (recipe) => {
    const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getRecipes) {
      const checkInProcess = Object.keys(getRecipes.meals).includes(recipe.idMeal);
      if (checkInProcess) {
        return (
          <Button
            testid="start-recipe-btn"
            label="Continue Recipe"
            type="button"
            className="buttonstart"
            onClick={ () => continueRecipeFunc() }
          />
        );
      }
    } return (
      <Button
        testid="start-recipe-btn"
        label="Start Recipe"
        type="button"
        className="buttonstart"
        onClick={ () => startRecipeFunc(recipe) }
      />
    );
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
                    favoriteFood(returnAPI);
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
                    removeFavoriteFood(sliceLocationId);
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
            <IngredientsList
              ingredients={ filterIngredientsFunc(returnAPI) }
              measures={ filterMeasuresFunc(returnAPI) }
            />
            <div data-testid="instructions">
              { returnAPI.meals[0].strInstructions }
            </div>
            <div data-testid="video">
              <iframe
                width="450"
                height="280"
                src={ youtubeLinkConverter(returnAPI) }
                frameBorder="0"
                allow="accelerometer; autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
            {startOrContinueButton(returnAPI.meals[0])}
            <RecomendationCard />
          </div>
        )
      }
    </div>
  );
}

export default DetailFoods;
