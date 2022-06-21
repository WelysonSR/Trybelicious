import React from 'react';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';

function Foods() {
  return (
    <div>
      <Header img1={ Profile } title="Foods" img2={ Search } />
    </div>
  );
}

export default Foods;
