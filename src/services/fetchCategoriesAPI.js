const fetchCategoriesAPI = async (page) => {
  const CATEGORIE_NUMBER = 5;
  if (page.includes('foods')) {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      return Object.values(data)[0]
        .slice(0, CATEGORIE_NUMBER)
        .map((category) => category.strCategory);
    } catch (error) {
      console.error(error);
    }
  } if (page.includes('drinks')) {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      return Object.values(data)[0]
        .slice(0, CATEGORIE_NUMBER)
        .map((category) => category.strCategory);
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchCategoriesAPI;
