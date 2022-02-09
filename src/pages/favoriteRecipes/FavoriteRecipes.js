import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import CardFavoriteDrink from '../../components/cardFavorite/CardFavoriteDrink';
import CardFavoriteFood from '../../components/cardFavorite/CardFavoriteFood';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState('');
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const getFavoriteRecipe = () => {
      const recipeFavorites = localStorage.getItem('favoriteRecipes');
      const arrFavoriteRecipes = JSON.parse(recipeFavorites);
      setFavRecipes(arrFavoriteRecipes);
    };
    getFavoriteRecipe();
  }, [remove]);

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

  const removeFavorite = (id) => {
    const arrayRecipe = localStorage.getItem('favoriteRecipes');
    const newArray = JSON.parse(arrayRecipe).filter((filtered) => filtered.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };
  return (
    <div>
      <Header
        label="Favorite Recipes"
        testid="page-title"
      />
      { favRecipes && console.log(favRecipes) }
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
            <button
              type="button"
              onClick={ () => {
                removeFavorite(recipe.id);
                setRemove(!remove);
              } }
            >
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="blackHeartIcon"
              />
            </button>
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
            <button
              type="button"
              onClick={ () => {
                removeFavorite(recipe.id);
                setRemove(!remove);
              } }
            >
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="blackHeartIcon"
              />
            </button>
          </div>
        )
      ))}
    </div>
  );
}
export default FavoriteRecipes;
