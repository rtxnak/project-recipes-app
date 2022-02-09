import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import CardFavoriteDrink from '../../components/cardFavorite/CardFavoriteDrink';
import CardFavoriteFood from '../../components/cardFavorite/CardFavoriteFood';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState('');

  useEffect(() => {
    const getFavoriteRecipe = () => {
      const recipeFavorites = localStorage.getItem('favoriteRecipes');
      const arrFavoriteRecipes = JSON.parse(recipeFavorites);
      setFavRecipes(arrFavoriteRecipes);
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
          <div key={ i }>
            <CardFavoriteFood
              recipe={ recipe }
            />
            <button
              type="button"
              onClick={ () => linkC(recipe) }
            >
              <img
                data-testid={ `${i}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            { linkCopy ? <p>Link copied!</p> : null }
          </div>
        ) : (
          <div key={ i }>
            <CardFavoriteDrink
              recipe={ recipe }
            />
            <button
              type="button"
              onClick={ () => linkC(recipe) }
            >
              <img
                data-testid={ `${i}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            { linkCopy ? <p>Link copied!</p> : null }
          </div>
        )
      ))}
    </div>
  );
}
export default FavoriteRecipes;
