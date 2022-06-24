import React from 'react';
import PropTypes from 'prop-types';

function CategoriesButtons({ categories, handleClick, handleClickAll }) {
  return (
    <div>
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
