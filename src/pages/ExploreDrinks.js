import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';

function ExploreDrinks() {
  return (
    <div>
      <Header img1={ Profile } title="Explore Drinks" />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
