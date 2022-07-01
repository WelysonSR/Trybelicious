import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardFavoritAll from '../components/CardFavoritAll';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import { saveFavorit } from '../redux/actions';
import styles from './FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const favoriteRecipes = useSelector((state) => state.foods.favoriteRecipes);
  const [favoritAll, setFavoritAll] = useState(favoriteRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFavoritAll = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    dispatch(saveFavorit(getFavoritAll));
  }, [dispatch]);

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
    // eslint-disable-next-line react/jsx-one-expression-per-line
    <><Header img1={ Profile } title="Favorite Recipes" />
      <form className={ styles.container }>
        <button
          className={ styles.btn }
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoritAll(favoriteRecipes) }
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
        {favoritAll.map((favofit, i) => (
          <CardFavoritAll key={ favofit.id } favofit={ favofit } index={ i } />
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
