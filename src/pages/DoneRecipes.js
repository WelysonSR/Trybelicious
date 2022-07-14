import React, { useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import styles from './DoneRecipes.module.css';

function DoneRecipes() {
  const [recipes] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);
  const [filterType, setFilterType] = useState(recipes);

  const filterFoods = () => {
    const newFilter = recipes.filter((food) => food.type === 'food');
    setFilterType(newFilter);
  };

  const filterDrinks = () => {
    const newFilter = recipes.filter((drinks) => drinks.type === 'drink');
    setFilterType(newFilter);
  };

  return (
    <>
      <Header img1={ Profile } title="Done Recipes" />
      <div>
        <form className={ styles.container }>
          <button
            className={ styles.btn }
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterType(recipes) }
          >
            All
          </button>
          <button
            className={ styles.btn }
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ filterFoods }
          >
            Food
          </button>
          <button
            className={ styles.btn }
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ filterDrinks }
          >
            Drinks
          </button>
        </form>
        <div className={ styles.favCards }>
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
      </div>
    </>
  );
}

export default DoneRecipes;
