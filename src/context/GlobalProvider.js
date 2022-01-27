import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLogin, setButtonLogin] = useState({ disabledButt: true });

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

  const contextValue = {
    handleEmail,
    email,
    handlePassword,
    password,
    buttonLogin,
    setButtonLogin,
  };
  return (
    <GlobalContext.Provider value={ contextValue }>
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};
