import fetchAPI from '../../services/fetchAPI';

export const redirectFinishFunc = (returnAPI) => {
  const arrayRecipeDone = localStorage.getItem('doneRecipes');
  const now = new Date();
  const dataDoneRecipe = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
  const {
    idMeal, strCategory, strMeal, strMealThumb, strTags, strArea,
  } = returnAPI.meals[0];
  const tagsArray = strTags.split(',');
  const doneRecipes = {
    id: idMeal,
    type: 'food',
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: dataDoneRecipe,
    tags: tagsArray,
    nationality: strArea,
  };

  const doneRecipesLocalstorage = arrayRecipeDone
    ? [...JSON.parse(arrayRecipeDone), doneRecipes] : [doneRecipes];
  localStorage.setItem('doneRecipes',
    JSON.stringify(doneRecipesLocalstorage));
};

export const verifyIdLocalstorage = async (id) => {
  const returnAPI = await fetchAPI('fetchMealById', id);
  const getRecipeLocalstorage = localStorage.getItem('favoriteRecipes');
  const recipeIdLocalstorage = JSON.parse(getRecipeLocalstorage);
  if (returnAPI && recipeIdLocalstorage) {
    recipeIdLocalstorage.map((value) => returnAPI.meals[0].idMeal === value.id);
    return true;
  } return false;
};
