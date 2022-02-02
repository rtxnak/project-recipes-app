import React from 'react';
import PropTypes from 'prop-types';
// import GlobalContext from '../../context/GlobalContext';

function Button(props) {
  const { label, testid, onClick, disabled = false, className } = props;
  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ onClick }
      disabled={ disabled }
      className={ className }
    >
      { label }
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
