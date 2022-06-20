import React, { useContext } from 'react';
import FoodsContext from '../context/FoodsContext';

function Foods() {
  const { user } = useContext(FoodsContext);
  return (
    <div>
      {user}
    </div>
  );
}

export default Foods;
