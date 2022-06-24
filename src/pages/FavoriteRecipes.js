import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardFavoritAll from '../components/CardFavoritAll';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';

function FavoriteRecipes() {
  const favoriteRecipes = useSelector((state) => state.foods.favoriteRecipes);
  const [favoritAll, setFavoritAll] = useState(favoriteRecipes);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavoritAll(favoriteRecipes);
  }, [favoriteRecipes]);

  const filterFoods = () => {
    const newFilter = favoriteRecipes.filter((food) => food.type === 'food');
    setFavoritAll(newFilter);
  };

  const filterDrinks = () => {
    const newFilter = favoriteRecipes.filter((drinks) => drinks.type === 'drink');
    setFavoritAll(newFilter);
  };

  return (
    <div>
      <Header img1={ Profile } title="Favorite Recipes" />
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoritAll(favoriteRecipes) }
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
        favoritAll.map((favofit, i) => (
          <CardFavoritAll key={ favofit.id } favofit={ favofit } index={ i } />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
