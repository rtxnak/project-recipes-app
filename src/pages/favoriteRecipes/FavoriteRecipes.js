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
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const filterByCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header
        label="Favorite Recipes"
        testid="page-title"
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name=""
        onClick={ ({ target: { name } }) => filterByCategory(name) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ ({ target: { name } }) => filterByCategory(name) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ ({ target: { name } }) => filterByCategory(name) }
      >
        Drinks
      </button>
      { favRecipes && favRecipes
        .filter((recipe) => (recipe.type.includes(selectedCategory)))
        .map((recipe, i) => (
          recipe.type === 'food' ? (
            <div key={ i }>
              <CardFavoriteFood
                recipe={ recipe }
                index={ i }
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
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="blackHeartIcon"
                />
              </button>
            </div>
          ) : (
            <div key={ i }>
              <CardFavoriteDrink
                recipe={ recipe }
                index={ i }
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
                  data-testid={ `${i}-horizontal-favorite-btn` }
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
