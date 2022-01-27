import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { label, testid, onClick } = props;
  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ onClick }
    >
      { label }
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
