import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { placeholder, name, onChange, type, testid, value = '' } = props;
  return (
    <div>
      <label htmlFor={ name }>
        <input
          data-testid={ testid }
          type={ type }
          placeholder={ placeholder }
          name={ name }
          onChange={ onChange }
          value={ value }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
