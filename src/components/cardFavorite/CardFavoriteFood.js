import React from 'react';

function CardFavoriteFood({ recipe }) {
  console.log(recipe);
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        width="200px"
      />
      <h2>{recipe.name}</h2>
      <h3>{recipe.category}</h3>
      <p>{recipe.nationality}</p>
    </div>
  );
}

CardFavoriteFood.propTypes = {
  recipe: PropTypes.objectOf(string),
}.isRequired;

export default CardFavoriteFood;
