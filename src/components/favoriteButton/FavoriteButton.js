import React from 'react';
import PropTypes from 'prop-types';

function FavoriteButton(props) {
  const { onClick, src, alt } = props;
  return (
    <div>
      <button
        type="button"
        onClick={ onClick }
      >
        <img
          data-testid="favorite-btn"
          src={ src }
          alt={ alt }
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default FavoriteButton;
