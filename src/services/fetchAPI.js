const fetchAPI = async (urlSelected, query) => {
  const URLs = {
    fetchMealByIngredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,

    fetchMealByName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,

    fetchMealByFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,

    fetchCocktailByIngredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,

    fetchCocktailByName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,

    fetchCocktailByFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`,

    fetchMealById: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`,

    fetchCocktailById: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${query}`,
  };

  if (query.length !== 1
    && (urlSelected === 'fetchMealByFirstLetter'
    || urlSelected === 'fetchCocktailByFirstLetter')) {
    global.alert('Your search must have only 1 (one) character');
  }
  try {
    const response = await fetch(URLs[urlSelected]);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchAPI;
