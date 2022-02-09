import React from 'react';
import PropTypes, { string } from 'prop-types';

function IngredientsCheck({ ingredients, measures, handleChange, checkboxList }) {
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
              name={ ingredient }
              onChange={ handleChange }
              checked={ Object.values(checkboxList)[i] }
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
  handleChange: PropTypes.func.isRequired,
  checkboxList: PropTypes.objectOf(string).isRequired,
};

export default IngredientsCheck;
