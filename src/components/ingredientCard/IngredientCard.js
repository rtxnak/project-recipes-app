import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import './IngredientCard.css';

function IngredientCard(props) {
  const {
    src,
    index,
    alt,
    label,
  } = props;

  const {
    filterByIngredient,
  } = useContext(GlobalContext);

  const location = useLocation();

  const redirectByPathname = () => {
    if (location.pathname.includes('foods')) {
      return '/foods';
    }
    return '/drinks';
  };

  return (
    <div className="ingredient-card">
      <Link
        to={ () => redirectByPathname() }
        onClick={ () => {
          filterByIngredient(label);
        } }
      >
        <div
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ src }
            data-testid={ `${index}-card-img` }
            alt={ alt }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { label }
          </h3>
        </div>
      </Link>
    </div>
  );
}

IngredientCard.propTypes = {
  src: PropTypes.string,
  index: PropTypes.string,
  alt: PropTypes.string,
  label: PropTypes.string,
}.isRequired;

export default IngredientCard;
