import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default UserProvider;
