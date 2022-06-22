import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileIcon from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <Header img1={ ProfileIcon } title="Profile" />
      <Footer />
    </div>
  );
}

export default Profile;
