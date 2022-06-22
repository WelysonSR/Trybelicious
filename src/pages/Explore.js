import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';

function Explore() {
  return (
    <div>
      <Header img1={ Profile } title="Explore" />
      <Footer />
    </div>
  );
}

export default Explore;
