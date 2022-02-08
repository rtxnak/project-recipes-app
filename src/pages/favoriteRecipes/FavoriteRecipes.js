import React from 'react';
import Header from '../../components/header/Header';

function FavoriteRecipes() {
  // const [favRecipes, setFavRecipes] = useState([]);
  const getFavoriteRecipe = () => {
    const recipeFavorites = localStorage.getItem('favoriteRecipes');
    const arrFavoriteRecipes = JSON.parse(recipeFavorites);
    // setFavRecipes(arrFavoriteRecipes);
    console.log(arrFavoriteRecipes);
    return arrFavoriteRecipes;
  };
  return (
    <div>
      <Header
        label="Favorite Recipes"
        testid="page-title"
      />
      { getFavoriteRecipe().map((recipe, i) => (
        <li key={ i }>{recipe.name}</li>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
