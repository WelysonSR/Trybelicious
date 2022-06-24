import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Card from '../components/Card';
import CategoriesButtons from '../components/CategoriesButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import './All.css';

function Foods() {
  const [meal, setMeals] = useState([]);
  const meals = useSelector((state) => state.foods.meals);
  const history = useHistory();
  const [allRecipes, setAllRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOn, setCategoryOn] = useState('');

  useEffect(() => {
    const fetchCategoriesMealsButtons = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals: categoriesList } = await response.json();
      const LIMIT = 4;
      const limitedCategories = categoriesList
        .filter((_category, index) => index <= LIMIT);
      setCategories(limitedCategories);
    };
    fetchCategoriesMealsButtons();
  }, []);

  const fetchAllFoodRecipes = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals: recipes } = await response.json();
    const LIMIT = 11;
    const limitedRecipes = recipes.filter((_meal, index) => index <= LIMIT);
    setAllRecipes(limitedRecipes);
  };

  useEffect(() => {
    fetchAllFoodRecipes();
  }, []);

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
  }, [meals]);

  const fecthFilterByCategory = async (value) => {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
    const { meals: filteredRecipes } = await response.json();
    const LIMIT = 11;
    const limitedRecipes = await filteredRecipes
      .filter((_meal, index) => index <= LIMIT);
    setAllRecipes(limitedRecipes);
  };

  const handleClick = async (value) => {
    if (categoryOn === 'All' || categoryOn === value) {
      fetchAllFoodRecipes();
      setCategoryOn(value);
    } else {
      fecthFilterByCategory(value);
      setCategoryOn(value);
    }
  };

  console.log(allRecipes);

  return (
    <>
      <Header img1={ Profile } title="Foods" img2={ Search } />
      <section>
        <CategoriesButtons
          categories={ categories }
          handleClick={ ({ target }) => handleClick(target.value) }
          handleClickAll={ () => fetchAllFoodRecipes() }
        />
      </section>
      <main className="cardAll">
        {
          meal.length === 0 && allRecipes.map((recipe, i) => (
            <Link key={ recipe.idMeal } to={ `/foods/${recipe.idMeal}` }>
              <Card
                key={ recipe.idMeal }
                img={ recipe.strMealThumb }
                title={ recipe.strMeal }
                index={ i }
              />
            </Link>
          ))
        }
        {
          meal.length > 0 && meal.map((card, i) => (
            <Link key={ card.idMeal } to={ `/foods/${card.idMeal}` }>
              <Card
                key={ card.idMeal }
                img={ card.strMealThumb }
                title={ card.strMeal }
                index={ i }
              />
            </Link>
          ))
        }
      </main>
      <Footer />
    </>
  );
}

export default Foods;
