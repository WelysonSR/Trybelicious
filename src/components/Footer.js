import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <button type="button" data-testid="drinks-bottom-btn">Drinks</button>
      </Link>

      <Link to="/explore">
        <button type="button" data-testid="explore-bottom-btn">Profile</button>
      </Link>

      <Link to="/foods">
        <button type="button" data-testid="food-bottom-btn">Foods</button>
      </Link>
    </footer>
  );
}

export default Footer;
