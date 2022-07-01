import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import styles from './Explore.module.css';

function Explore() {
  return (
    <div className={ styles.back }>
      <Header img1={ Profile } title="Explore" />

      <div className={ styles.container }>
        <Link to="/explore/foods">
          <button type="button" data-testid="explore-foods">Explore Foods</button>
        </Link>

        <Link to="/explore/drinks">
          <button type="button" data-testid="explore-drinks">Explore Drinks</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Explore;
