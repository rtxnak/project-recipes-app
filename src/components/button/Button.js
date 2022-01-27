import React from 'react';
import PropTypes from 'prop-types';
// import GlobalContext from '../../context/GlobalContext';

function Button(props) {
  const { label, testid, onClick, disabled } = props;
  //  const { buttonLogin } = useContext(GlobalContext);
  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ onClick }
      disabled={ disabled }
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
};

export default Button;
