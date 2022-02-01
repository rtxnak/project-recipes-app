import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ ingredients, measures }) {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        { ingredients.map((ingredient, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {`${ingredient} - ${measures[i]}`}
          </li>
        )) }
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsList;
