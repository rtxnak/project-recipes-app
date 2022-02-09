import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import CardFavoriteDrink from '../../components/cardFavorite/CardFavoriteDrink';
import CardFavoriteFood from '../../components/cardFavorite/CardFavoriteFood';
import Header from '../../components/header/Header';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState('');

  useEffect(() => {
    const getFavoriteRecipe = () => {
      const recipeFavorites = localStorage.getItem('favoriteRecipes');
      const arrFavoriteRecipes = JSON.parse(recipeFavorites);
      setFavRecipes(arrFavoriteRecipes);
      // console.log(recipeFavorites);
    };
    getFavoriteRecipe();
  }, []);

  const [linkCopy, setLinkCopy] = useState(false);
  const linkC = (value) => {
    if (value.type === 'food') {
      const link = `http://localhost:3000/foods/${value.id}`;
      copy(link);
      setLinkCopy(true);
    }
    if (value.type === 'drink') {
      const link = `http://localhost:3000/drinks/${value.id}`;
      copy(link);
      setLinkCopy(true);
    }
  };

  return (
    <div>
      <Header
        label="Favorite Recipes"
        testid="page-title"
      />
      { favRecipes && favRecipes.map((recipe, i) => (
        recipe.type === 'food' ? (
          <CardFavoriteFood
            recipe={ recipe }
            key={ i }
          />
        )
          : (
            <CardFavoriteDrink
              recipe={ recipe }
              key={ i }
            />
          )
      ))}
    </div>
  );
}
export default FavoriteRecipes;
