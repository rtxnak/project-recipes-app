import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImg from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Button from '../../components/button/Button';
import IngredientsList from '../../components/ingredientList/IngredientList';
import fetchAPI from '../../services/fetchAPI';
import RecomendationCard from '../../components/recomendationCard/RecomendationCard';
import './DetailDrinks.css';
import {
  filterIngredientsFunc,
  filterMeasuresFunc,
  youtubeLinkConverter,
  favoriteDrink,
  removeFavoriteDrink,
} from './FuncDetailDrinks';
import GlobalContext from '../../context/GlobalContext';

const CUT = '/drinks/';
function DetailDrink() {
  const {
    handleRecipeStarted,
  } = useContext(GlobalContext);

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

  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = () => {
    copy(window.location.href);
    setLinkCopy(true);
  };
  const history = useHistory();
  const [favoriteButt, setFavoriteButt] = useState(false);

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

  const startRecipeFunc = (recipe) => {
    handleRecipeStarted(recipe, '');
    history.push(`/drinks/${sliceLocationId}/in-progress`);
  };

  const continueRecipeFunc = () => {
    history.push(`/drinks/${sliceLocationId}/in-progress`);
  };

  const startOrContinueButton = (recipe) => {
    const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getRecipes) {
      const checkInProcess = Object.keys(getRecipes.cocktails).includes(recipe.idDrink);
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
                    favoriteDrink(returnAPIDrink);
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
                    removeFavoriteDrink(sliceLocationId);
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
            {startOrContinueButton(returnAPIDrink.drinks[0])}
            <RecomendationCard />
          </div>
        )
      }
    </div>
  );
}

export default DetailDrink;
