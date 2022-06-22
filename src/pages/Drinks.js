import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import './All.css';

function Drinks() {
  const [cocktails, setCocktails] = useState();
  const drinks = useSelector((state) => state.drinks.drinks);
  const history = useHistory();

  useEffect(() => {
    if (!drinks) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    const NUMBER = 1;
    if (drinks.length === NUMBER) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    } else {
      const AMOUNT = 11;
      const newDrinks = drinks.filter((_meal, i) => i <= AMOUNT);
      setCocktails(newDrinks);
    }
  }, [drinks, history]);

  return (
    <>
      <Header img1={ Profile } title="Drinks" img2={ Search } />
      <main className="cardAll">
        {
          cocktails && cocktails.map((card, i) => (
            <Card
              key={ card.idDrink }
              title={ card.strDrink }
              img={ card.strDrinkThumb }
              index={ i }
            />
          ))
        }
      </main>
    </>
  );
}

export default Drinks;
