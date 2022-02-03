import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCheck({ ingredients, measures }) {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        { ingredients.map((ingredient, i) => (
          <li
            data-testid={ `${i}-ingredient-step` }
            key={ i }
          >
            {`${ingredient} - ${measures[i]}`}
            <input
              type="checkbox"
              name="ingredient"
            />
          </li>
        )) }
      </ul>
    </div>
  );
}

IngredientsCheck.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsCheck;
