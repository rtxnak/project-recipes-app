import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Card = ({ index, img, name, id }) => {
  const location = useLocation();
  return (
    <Link to={ `${location.pathname}/${id}` }>
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <h3 data-testid={ `${index}-card-name` }>
          { name }
        </h3>
        <img
          data-testid={ `${index}-card-img` }
          src={ img }
          alt="description"
          width="200px"
        />
      </div>
    </Link>
  );
};

const { number, string } = PropTypes;

Card.propTypes = {
  img: string.isRequired,
  index: number.isRequired,
  name: string.isRequired,
  id: number.isRequired,
};

export default Card;
