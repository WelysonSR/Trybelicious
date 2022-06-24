import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';

function ExploreFoods() {
  return (
    <div>
      <Header img1={ Profile } title="Explore Foods" />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
