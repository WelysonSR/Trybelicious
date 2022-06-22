import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';

function Foods() {
  const store = useStore().getState();

  useEffect(() => {
    console.log(store);
  });

  return (
    <div>
      <Header img1={ Profile } title="Foods" img2={ Search } />
    </div>
  );
}

export default Foods;
