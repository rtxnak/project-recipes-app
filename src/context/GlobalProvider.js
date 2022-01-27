import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const contextValue = {
    handleEmail,
    email,
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
