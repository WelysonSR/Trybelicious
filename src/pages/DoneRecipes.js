import React, { useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';

function DoneRecipes() {
  const [recipes] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);
  const [filterType, setFilterType] = useState(recipes);

  const filterFoods = () => {
    const newFilter = filterType.filter((food) => food.type === 'food');
    setFilterType(newFilter);
  };

  const filterDrinks = () => {
    const newFilter = filterType.filter((drinks) => drinks.type === 'drink');
    setFilterType(newFilter);
  };

  return (
    <div>
      <Header img1={ Profile } title="Done Recipes" />
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterType(recipes) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterFoods }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
      </form>

      {
        filterType && filterType.map((done, i) => (
          <CardDoneRecipes
            key={ i }
            index={ i }
            done={ done }
          />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
