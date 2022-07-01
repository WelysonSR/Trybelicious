import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import styles from './ExploreDrinks.module.css';

function ExploreDrinks() {
  const history = useHistory();

  const randomDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const { drinks } = await (await fetch(url)).json();
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div className={ styles.container }>
      <Header img1={ Profile } title="Explore Drinks" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ randomDrink }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
