export const filterIngredientsFunc = (returnAPI) => {
  if (returnAPI) {
    const mealsIngredients = Object.entries(returnAPI.meals[0])
      .filter((key) => key[0].includes('strIngredient') && key[1])
      .map((e) => e[1]);
    return mealsIngredients;
  }
};

export const filterMeasuresFunc = (returnAPI) => {
  if (returnAPI) {
    const mealsMeasures = Object.entries(returnAPI.meals[0])
      .filter((key) => key[0].includes('strMeasure') && key[1])
      .map((e) => e[1]);
    return mealsMeasures;
  }
};

export const youtubeLinkConverter = (returnAPI) => {
  const youtubeAPI = returnAPI.meals[0].strYoutube;
  const youtubeAPISlipted = youtubeAPI.split('https://www.youtube.com/watch?v=')[1];
  return `https://www.youtube.com/embed/${youtubeAPISlipted}`;
};

export const favoriteFood = (returnAPI) => {
  const arrayRecipe = localStorage.getItem('favoriteRecipes');
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
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

export const removeFavoriteFood = (id) => {
  const arrayRecipe = localStorage.getItem('favoriteRecipes');
  const newArray = JSON.parse(arrayRecipe).filter((filtered) => filtered.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
};
