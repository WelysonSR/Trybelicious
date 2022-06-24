import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveFavorit } from '../redux/actions';
import './CardFavoritAll.css';

function CardFavoritAll({ favofit, index }) {
  const [tooltip, setTooltip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const NUMBER = 1000;
    setTimeout(() => {
      setTooltip(false);
    }, NUMBER);
  }, [tooltip]);

  const copyUrl = (type, id) => {
    setTooltip(true);
    const urlAtual = document.URL;
    const mainURL = urlAtual.split('/favorite')[0];
    navigator.clipboard.writeText(`${mainURL}/${type}s/${id}`);
  };

  const clearFavorit = (id) => {
    const favoritsAll = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoritis = favoritsAll.filter((favorit) => favorit.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritis));
    dispatch(saveFavorit(newFavoritis));
  };

  return (
    <>
      {
        tooltip && <p>Link copied!</p>
      }
      <div className="cardFavorit">
        <Link to={ `/${favofit.type}s/${favofit.id}` }>
          <img
            src={ favofit.image }
            alt=""
            className="cardImg"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <div>
          {
            (favofit.type === 'food') && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${favofit.nationality} - ${favofit.category}`}
              </p>
            )
          }
          {
            (favofit.type === 'drink') && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {favofit.alcoholicOrNot}
              </p>
            )
          }
          <Link to={ `/${favofit.type}s/${favofit.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{favofit.name}</p>
          </Link>
        </div>
        <button
          type="button"
          className="shareFavorit"
          onClick={ () => copyUrl(favofit.type, favofit.id) }
        >
          <img
            src={ shareIcon }
            alt=""
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          type="button"
          className="heartFavorit"
          onClick={ () => clearFavorit(favofit.id) }
        >
          <img
            src={ blackHeartIcon }
            alt="Heart"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </>
  );
}

CardFavoritAll.propTypes = {
  favofit: PropTypes.string,
}.isRequired;

export default CardFavoritAll;
