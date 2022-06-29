import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import { saveDoneRecipes } from '../redux/actions';

function DoneRecipes() {
  const dispatch = useDispatch();
  const doneRecipes = useSelector((state) => state.foods.doneRecipes);
  const [filterType, setFilterType] = useState(doneRecipes);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    dispatch(saveDoneRecipes(recipes));
  }, [dispatch]);

  const filterFoods = () => {
    const newFilter = doneRecipes.filter((food) => food.type === 'food');
    setFilterType(newFilter);
  };

  const filterDrinks = () => {
    const newFilter = doneRecipes.filter((drinks) => drinks.type === 'drink');
    setFilterType(newFilter);
  };

  return (
    <div>
      <Header img1={ Profile } title="Done Recipes" />
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterType(doneRecipes) }
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
