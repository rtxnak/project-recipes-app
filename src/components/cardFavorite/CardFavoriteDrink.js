import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';

function CardFavoriteDrink({ recipe, index }) {
  const redirectByid = (value) => {
    if (value.type === 'food') {
      return `foods/${value.id}`;
    }
    if (value.type === 'drink') {
      return `drinks/${value.id}`;
    }
  };
  return (
    <div>
      <Link
        to={ () => redirectByid(recipe) }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
          width="200px"
        />
        <h2
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </h2>
      </Link>
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.alcoholicOrNot}
      </h3>
    </div>
  );
}

CardFavoriteDrink.propTypes = {
  recipe: PropTypes.objectOf(string).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFavoriteDrink;
