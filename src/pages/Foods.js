import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import './All.css';

function Foods() {
  const [meal, setMeals] = useState();
  const meals = useSelector((state) => state.foods.meals);
  const history = useHistory();

  useEffect(() => {
    if (!meals) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    const NUMBER = 1;
    if (meals.length === NUMBER) {
      history.push(`/foods/${meals[0].idMeal}`);
    } else {
      const AMOUNT = 11;
      const newMeals = meals.filter((_meal, i) => (i <= AMOUNT));
      setMeals(newMeals);
    }
  }, [meals, history]);

  return (
    <>
      <Header img1={ Profile } title="Foods" img2={ Search } />
      <main className="cardAll">
        {
          meal && meal.map((card, i) => (
            <Card
              key={ card.idMeal }
              img={ card.strMealThumb }
              title={ card.strMeal }
              index={ i }
              id={ card.idMeal }
              type="foods"
            />
          ))
        }
      </main>
    </>
  );
}

export default Foods;
