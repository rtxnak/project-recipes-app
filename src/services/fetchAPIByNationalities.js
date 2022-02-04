const fetchRecipesNationalitiesAPI = async (query) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
  const data = await response.json();
  return data;
};

export default fetchRecipesNationalitiesAPI;
