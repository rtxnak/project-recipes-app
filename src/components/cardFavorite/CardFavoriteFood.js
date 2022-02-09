import React from 'react';
import PropTypes, { string } from 'prop-types';

function CardFavoriteFood({ recipe }) {
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
  recipe: PropTypes.objectOf(string).isRequired,
};

export default CardFavoriteFood;
