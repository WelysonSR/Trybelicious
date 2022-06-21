import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ img1, title, img2 }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <section className="header-container">
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ img1 } alt="profile" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {
          img2 && (
            <button type="button" onClick={ () => setIsOpen(!isOpen) }>
              <img data-testid="search-top-btn" src={ img2 } alt="search" />
            </button>
          )
        }
      </section>
      {
        isOpen && (
          <form className="open">
            <input
              data-testid="search-input"
              className="search-input"
              type="text"
              placeholder="Search"
            />
            <section className="radio-input">
              <label htmlFor="Ingredient">
                <input
                  type="radio"
                  name="search-type"
                  value="Ingredient"
                  id="Ingredient"
                />
                Ingredient
              </label>
              <label htmlFor="Name">
                <input
                  type="radio"
                  name="search-type"
                  value="Name"
                  id="Name"
                />
                Name
              </label>
              <label htmlFor="First-Letter">
                <input
                  type="radio"
                  name="search-type"
                  value="First Letter"
                  id="First-Letter"
                />
                First Letter
              </label>
            </section>

            <button type="submit" className="submit-btn">
              Search
            </button>
          </form>
        )
      }
    </header>
  );
}

Header.propTypes = {
  img1: PropTypes.string,
  title: PropTypes.string,
  img2: PropTypes.string,
}.isRequired;

export default Header;
