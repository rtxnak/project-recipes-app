const fetchByCategoryAPI = async (page, category) => {
  if (page.includes('foods')) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  } if (page.includes('drinks')) {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchByCategoryAPI;
