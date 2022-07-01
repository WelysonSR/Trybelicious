import React, { useEffect, useState } from 'react';
import CardIngredients from '../components/CardIngredients';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import styles from './ExploreIngredients.module.css';

function ExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const URL = window.location.pathname.split('/')[2];

  useEffect(() => {
    const NUMBER_OF_INGREDIENTS = 12;
    if (URL === 'foods') {
      const fetchIngredient = async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        const { meals } = await (await fetch(url)).json();
        const MAXIMUMINGREDIENTS = meals.filter((_item, i) => i < NUMBER_OF_INGREDIENTS);
        setIngredients(MAXIMUMINGREDIENTS);
      };
      fetchIngredient();
    }
    if (URL === 'drinks') {
      const fetchIngredient = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        const { drinks } = await (await fetch(url)).json();
        const MAXIMUMINGREDIENTS = drinks.filter((_item, i) => i < NUMBER_OF_INGREDIENTS);
        setIngredients(MAXIMUMINGREDIENTS);
      };
      fetchIngredient();
    }
  }, [URL]);

  return (
    <>
      <Header img1={ Profile } title="Explore Ingredients" />
      <div className={ styles.container }>
        <div className={ styles.cardAll }>
          {ingredients.length > 0 && ingredients.map((recipe, i) => (
            <CardIngredients
              key={ i }
              index={ i }
              type={ URL }
              recipe={ recipe }
            />
          ))}
        </div>
        <Footer />
      </div>

    </>
  );
}

export default ExploreIngredients;
