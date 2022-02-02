export const filterIngredientsFunc = (returnAPIDrink) => {
  if (returnAPIDrink) {
    const drinksIngredients = Object.entries(returnAPIDrink.drinks[0])
      .filter((key) => key[0].includes('strIngredient') && key[1])
      .map((e) => e[1]);
    return drinksIngredients;
  }
};

export const filterMeasuresFunc = (returnAPIDrink) => {
  if (returnAPIDrink) {
    const drinksMeasures = Object.entries(returnAPIDrink.drinks[0])
      .filter((key) => key[0].includes('strMeasure') && key[1])
      .map((e) => e[1]);
    return drinksMeasures;
  }
};

export const youtubeLinkConverter = (returnAPIDrink) => {
  if (returnAPIDrink) {
    const youtubeAPI = returnAPIDrink.drinks[0].strVideo;
    if (youtubeAPI) {
      const youtubeAPISlipted = youtubeAPI.split('https://www.youtube.com/watch?v=')[1];
      return `https://www.youtube.com/embed/${youtubeAPISlipted}`;
    } return null;
  }
};
