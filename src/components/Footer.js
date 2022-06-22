import React from 'react';
import { Link } from 'react-router-dom';
import drinkImg from '../images/drinkIcon.svg';
import mealImg from '../images/mealIcon.svg';
import exploreImg from '../images/exploreIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <Link to="/drinks">
        <img src={ drinkImg } alt="drink" data-testid="drinks-bottom-btn" />
      </Link>

      <Link to="/explore">
        <img src={ exploreImg } alt="explore" data-testid="explore-bottom-btn" />
      </Link>

      <Link to="/foods">
        <img src={ mealImg } alt="meal" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
