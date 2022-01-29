import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLogin, setButtonLogin] = useState({ disabledButt: true });
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setBySearch] = useState('');
  const [radioSelected, setRadioSelected] = useState('');

  const validateButton = () => {
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordLength = 6;
    if (emailValid && password.length >= passwordLength) {
      setButtonLogin({ disabledButt: false });
    } else {
      setButtonLogin({ disabledButt: true });
    }
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    validateButton();
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    validateButton();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const contextValue = {
    handleEmail,
    email,
    handlePassword,
    password,
    buttonLogin,
    setButtonLogin,
    handleClick,
    showSearchBar,
    setShowSearchBar,
    search,
    setBySearch,
    radioSelected,
    setRadioSelected,
  };
  return (
    <GlobalContext.Provider value={ contextValue }>
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
