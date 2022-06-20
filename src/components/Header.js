import React from 'react';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img data-testid="profile-top-btn" src={ Profile } alt="profile" />
      <h1 data-testid="page-title">Foods</h1>
      <img data-testid="search-top-btn" src={ Search } alt="search" />
    </header>
  );
}

export default Header;
