import fetchAPI from '../../services/fetchAPI';

export const redirectFinishFunc = (returnAPIDrink) => {
  const arrayRecipeDone = localStorage.getItem('doneRecipes');
  const now = new Date();
  const dataDoneRecipe = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
  const {
    idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb,
  } = returnAPIDrink.drinks[0];
  console.log(returnAPIDrink.drinks[0]);
  // const tagsArray = strTags.split(',');
  const doneRecipes = {
    id: idDrink,
    type: 'drink',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: dataDoneRecipe,
    tags: [],
    nationality: '',
  };

  const doneRecipesLocalstorage = arrayRecipeDone
    ? [...JSON.parse(arrayRecipeDone), doneRecipes] : [doneRecipes];
  localStorage.setItem('doneRecipes',
    JSON.stringify(doneRecipesLocalstorage));
};

export const verifyIdLocalstorageDrink = async (id) => {
  const returnAPIDrink = await fetchAPI('fetchCocktailById', id);
  const getRecipeLocalstorage = localStorage.getItem('favoriteRecipes');
  const recipeIdLocalstorage = JSON.parse(getRecipeLocalstorage);
  if (returnAPIDrink && recipeIdLocalstorage) {
    recipeIdLocalstorage.map((value) => returnAPIDrink.drinks[0].idDrink === value.id);
    return true;
  } return false;
};
