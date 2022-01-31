import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ index, img, name }) => (
  <div
    data-testid={ `${index}-recipe-card` }
  >
    <h3 data-testid={ `${index}-card-name` }>
      {name}
    </h3>
    <img
      data-testid={ `${index}-card-img` }
      src={ img }
      alt="description"
      width="200px"
    />
  </div>
);

const { number, string } = PropTypes;

Card.propTypes = {
  img: string.isRequired,
  index: number.isRequired,
  name: string.isRequired,
};

export default Card;
