import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodsContext from './FoodsContext';

function FoodsProvider({ children }) {
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);

  const value = {
    user,
    setUser,
    foods,
    setFoods,
  };

  return (
    <FoodsContext.Provider value={ value }>
      { children }
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default FoodsProvider;
