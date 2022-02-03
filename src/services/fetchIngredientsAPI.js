const fetchIngredientsAPI = async (page) => {
  const NUMBER = 12;
  if (page.includes('foods')) {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      return Object.values(data)[0]
        .slice(0, NUMBER)
        .map((ingredient) => ingredient.strIngredient);
    } catch (error) {
      console.error(error);
    }
  } if (page.includes('drinks')) {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      return Object.values(data)[0]
        .slice(0, NUMBER)
        .map((ingredient) => ingredient.strIngredient1);
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchIngredientsAPI;
