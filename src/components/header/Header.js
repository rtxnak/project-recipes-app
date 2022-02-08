import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import GlobalContext from '../../context/GlobalContext';
import SearchBar from '../searchBar/SearchBar';
import './Header.css';

function Header(props) {
  const {
    label,
    testid,
  } = props;

  const history = useHistory();

  const {
    showSearchBar,
    setShowSearchBar,
  } = useContext(GlobalContext);

  const searchButton = () => (
    <button
      type="button"
      onClick={ () => setShowSearchBar(!showSearchBar) }
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
    } setShowSearchBar(false);
  };

  const handleClickProfile = () => {
    history.push('/profile');
  };

  return (
    <div className="header">
      <div className="buttonHeader">
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
        <div
          className="foodsHeader"
          data-testid={ testid }
        >
          <h1>{label}</h1>
        </div>
        <div className="search-bar">
          {showSearchBar && <SearchBar />}
        </div>
      </div>
      <div>
        {displaySearchButton()}
      </div>
    </div>
  );
}

Header.propTypes = {
  label: PropTypes.string,
  testid: PropTypes.string,
  // history: PropTypes.node,
}.isRequired;

export default Header;
