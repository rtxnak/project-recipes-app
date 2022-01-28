import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const {
    label,
    testid,
  } = props;

  const history = useHistory();

  const searchButton = () => (
    <button
      type="button"
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="SearchIcon"
      />
    </button>
  );

  const displaySearchButton = () => {
    if (label === 'Foods'
      || label === 'Explore Nationalities'
      || label === 'Drinks') {
      return searchButton();
    }
  };

  const handleClickProfile = () => {
    history.push('/profile');
    console.log(history);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickProfile }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="ProfileIcon"
        />
      </button>
      <header
        data-testid={ testid }
      >
        <h1>{ label }</h1>
      </header>
      { displaySearchButton() }
    </div>
  );
}

Header.propTypes = {
  label: PropTypes.string,
  testid: PropTypes.string,
  // history: PropTypes.node,
}.isRequired;

export default Header;
