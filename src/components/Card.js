import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ index, img, title, id, type }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="card">
      <Link to={ `${type}/${id}` }>
        <img
          className="card-img"
          data-testid={ `${index}-card-img` }
          src={ img }
          alt=""
        />
      </Link>
      <h6 data-testid={ `${index}-card-name` }>{ title }</h6>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape(),
  title: PropTypes.string,
}.isRequired;

export default Card;
