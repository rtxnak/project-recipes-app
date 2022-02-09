import React from 'react';
import PropTypes from 'prop-types';

function CardFavoriteDrink({ recipe }) {
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        width="200px"
      />
      <h2>{recipe.name}</h2>
      <h3>{recipe.alcoholicOrNot}</h3>
    </div>
  );
}

CardFavoriteDrink.propTypes = {
  recipe: PropTypes.objectOf(string),
}.isRequired;

export default CardFavoriteDrink;
