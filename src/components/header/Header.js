import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const {
    label,
    testid,
  } = props;

  return (
    <div>
      <button
        data-testid="profile-top-btn"
        type="button"
      >
        Profile
      </button>
      <header
        data-testid={ testid }
      >
        <h1>{ label }</h1>
      </header>

      <button
        data-testid="search-top-btn"
        type="button"
      >
        Search
      </button>
    </div>
  );
}

Header.propTypes = {
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default Header;
