import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './CardDoneRecipes.css';

function CardDoneRecipes({ index, done }) {
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const NUMBER = 1000;
    setTimeout(() => {
      setTooltip(false);
    }, NUMBER);
  }, [tooltip]);

  const copyUrl = (type, id) => {
    setTooltip(true);
    const urlAtual = document.URL;
    const mainURL = urlAtual.split('/done-')[0];
    navigator.clipboard.writeText(`${mainURL}/${type}s/${id}`);
  };

  return (
    <>
      {
        tooltip && <p>Link copied!</p>
      }
      <div className="cardDone">
        <Link to={ `/${done.type}s/${done.id}` }>
          <img
            src={ done.image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
            className="imgDone"
          />
        </Link>
        <div>
          {
            (done.type === 'food') && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${done.nationality} - ${done.category}`}
              </p>
            )
          }
          {
            (done.type === 'drink') && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {done.alcoholicOrNot}
              </p>
            )
          }
          <Link to={ `/${done.type}s/${done.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{done.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{done.doneDate}</p>
          {
            done.tags && done.tags.map((tagName) => (
              <samp
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </samp>
            ))
          }
        </div>
        <button
          type="button"
          className="shareDone"
          onClick={ () => copyUrl(done.type, done.id) }
        >
          <img
            src={ shareIcon }
            alt=""
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
      </div>
    </>
  );
}

CardDoneRecipes.propTypes = {
  img: PropTypes.string,
}.isRequired;

export default CardDoneRecipes;
