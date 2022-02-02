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
  console.log(youtubeAPISlipted);
  return `https://www.youtube.com/embed/${youtubeAPISlipted}`;
};
