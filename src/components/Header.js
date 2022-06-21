import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../redux/actions';
import './Header.css';

function Header({ img1, title, img2 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [choice, setChoice] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const NUMBER = 1;
    switch (choice) {
    case 'Ingredient':
      dispatch(fetchIngredient(search));
      break;
    case 'Name':
      dispatch(fetchName(search));
      break;
    case 'First Letter':
      if (search.length > NUMBER) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        dispatch(fetchFirstLetter(search));
      }
      break;
    default:
      break;
    }
  };

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
          <form className="open" onSubmit={ handleSubmit }>
            <input
              data-testid="search-input"
              className="search-input"
              type="text"
              name="search"
              value={ search }
              onChange={ ({ target }) => setSearch(target.value) }
              placeholder="Search"
            />
            <section className="radio-input">
              <label htmlFor="Ingredient">
                <input
                  data-testid="ingredient-search-radio"
                  type="radio"
                  name="search-type"
                  value="Ingredient"
                  id="Ingredient"
                  onChange={ ({ target }) => setChoice(target.value) }
                />
                Ingredient
              </label>
              <label htmlFor="Name">
                <input
                  data-testid="name-search-radio"
                  type="radio"
                  name="search-type"
                  value="Name"
                  id="Name"
                  onChange={ ({ target }) => setChoice(target.value) }
                />
                Name
              </label>
              <label htmlFor="First-Letter">
                <input
                  data-testid="first-letter-search-radio"
                  type="radio"
                  name="search-type"
                  value="First Letter"
                  id="First-Letter"
                  onChange={ ({ target }) => setChoice(target.value) }
                />
                First Letter
              </label>
            </section>

            <button
              data-testid="exec-search-btn"
              type="submit"
              className="submit-btn"
              variant="primary"
            >
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
