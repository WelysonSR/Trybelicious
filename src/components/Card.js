import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ index, img, title }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="card">
      <img
        className="card-img"
        data-testid={ `${index}-card-img` }
        src={ img }
        alt=""
      />
      <h6 data-testid={ `${index}-card-name` }>{ title }</h6>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape(),
  title: PropTypes.string,
}.isRequired;

export default Card;
