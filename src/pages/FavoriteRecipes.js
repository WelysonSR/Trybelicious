import React from 'react';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <Header img1={ Profile } title="Favorite Recipes" />
    </div>
  );
}

export default FavoriteRecipes;
