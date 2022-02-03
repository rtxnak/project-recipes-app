import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
import IngredientsList from '../../components/ingredientList/IngredientList';
// import fetchAPI from '../../services/fetchAPI';

// const CUT = '/foods/';
function ProgressFoods() {
  // const [returnAPI] = useState('');
  // const [recipe, setRecipe] = useState({});

  // const location = useLocation();
  // const sliLocationId = location.pathname.split(CUT)[1];
  // // console.log(sliceLocationId);
  // useEffect(() => {
  //   const returnFetchApi = async () => {
  //     const result = await fetchAPI('fetchMealById', sliLocationId);
  //     setReturnAPI(result);
  //   };
  //   returnFetchApi();
  // }, [sliLocationId]);

  async function handleFoodSurprise() {
    const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const promise = await fetch(ENDPOINT);
    const result = await promise.json();
    const { idMeal } = result.meals[0];
    const recipe = { idMeal };
    console.log(recipe);
    console.log('returnAPI');
    return recipe;
    // return history.push(`/foods/${idMeal}`);
  }

  // const filterIngredientsFunc = () => {
  //   if (returnAPI) {
  //     const mealsIngredients = Object.entries(returnAPI.meals[0])
  //       .filter((key) => key[0].includes('strIngredient') && key[1])
  //       .map((e) => e[1]);
  //     return mealsIngredients;
  //   }
  // };

  useEffect(() => {
    handleFoodSurprise();
    // console.log(recipe);
    // console.log('returnAPI');
  }, []);

  return (
    <div>
      {
        // recipe
        handleFoodSurprise()
        && (
          <div>
            <h2>Foods in Progress</h2>
            <img
              data-testid="recipe-photo"
              alt="Img"
              // src={ recipe.strMealThumb }
              width="200px"
            />
            {/* <h2 data-testid="recipe-title">{returnAPI.meals[0].strMeal}</h2>

            <h4 data-testid="recipe-category">{returnAPI.meals[0].strCategory}</h4> */}

            <button
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>

            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>

            {/* <p data-testid="instructions">{returnAPI.meals[0].strInstructions}</p> */}

            <IngredientsList
              ingredients={ filterIngredientsFunc() }
              measures={ filterMeasuresFunc() }
            />

            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finish Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}

export default ProgressFoods;
