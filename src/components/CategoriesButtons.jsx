import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoriesButtons.module.css';

function CategoriesButtons({ categories, handleClick, handleClickAll }) {
  return (
    <div className={ styles.container }>
      { categories.map((category) => (
        <button
          key={ `${category.strCategory}` }
          type="submit"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleClick }
          value={ category.strCategory }
          name={ category.strCategory }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        type="submit"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
        value="All"
      >
        All
      </button>
    </div>

  );
}

CategoriesButtons.propTypes = {
  categories: PropTypes.array,
  handleClick: PropTypes.func,
  handleClickAll: PropTypes.func,
}.isRequired;

export default CategoriesButtons;
