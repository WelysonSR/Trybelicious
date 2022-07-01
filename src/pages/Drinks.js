import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import CategoriesButtons from '../components/CategoriesButtons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import styles from './Drinks.module.css';

function Drinks() {
  const [cocktails, setCocktails] = useState([]);
  const drinks = useSelector((state) => state.drinks.drinks);
  const history = useHistory();
  const [allRecipes, setAllRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOn, setCategoryOn] = useState('');
  const [exploreFilter, setExploreFilter] = useState([]);
  const [verifyExplorer, setVerifyExplorer] = useState(false);
  const drinksExplore = useSelector((state) => state.foods.recipeForExplore);

  useEffect(() => {
    setVerifyExplorer(true);
    setExploreFilter(drinksExplore);
  }, [drinksExplore]);

  useEffect(() => {
    const fetchCategoriesDrinksButtons = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks: categoriesList } = await response.json();
      const LIMIT = 4;
      const limitedCategories = categoriesList
        .filter((_category, index) => index <= LIMIT);
      setCategories(limitedCategories);
    };
    fetchCategoriesDrinksButtons();
  }, []);

  const fetchAllDrinksRecipes = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks: recipes } = await response.json();
    const LIMIT = 11;
    const limitedRecipes = recipes.filter((_cocktail, index) => index <= LIMIT);
    setAllRecipes(limitedRecipes);
  };

  useEffect(() => {
    fetchAllDrinksRecipes();
  }, []);

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

  const fecthFilterByCategory = async (value) => {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
    const { drinks: filteredRecipes } = await response.json();
    const LIMIT = 11;
    const limitedRecipes = await filteredRecipes
      .filter((_cocktail, index) => index <= LIMIT);
    setAllRecipes(limitedRecipes);
  };

  const handleClick = async (value) => {
    setVerifyExplorer(false);
    if (categoryOn === 'All' || categoryOn === value) {
      fetchAllDrinksRecipes();
      setCategoryOn(value);
    } else {
      fecthFilterByCategory(value);
      setCategoryOn(value);
    }
  };

  return (
    <div className={ styles.container }>
      <Header img1={ Profile } title="Drinks" img2={ Search } />
      <section className={ styles.filters }>
        <CategoriesButtons
          categories={ categories }
          handleClick={ ({ target }) => handleClick(target.value) }
          handleClickAll={ () => fetchAllDrinksRecipes() }
        />
      </section>
      <main className={ styles.cardAll }>
        {
          verifyExplorer && exploreFilter.map((explored, i) => (
            <Card
              key={ i }
              img={ explored.strDrinkThumb }
              title={ explored.strDrink }
              index={ i }
              id={ explored.idDrink }
              type="drinks"
            />
          ))
        }
        {
          cocktails.length === 0 && allRecipes.map((recipe, i) => (
            <Card
              key={ recipe.idDrink }
              title={ recipe.strDrink }
              img={ recipe.strDrinkThumb }
              index={ i }
              id={ recipe.idDrink }
              type="drinks"
            />
          ))
        }
        {
          cocktails.length > 0 && cocktails.map((card, i) => (
            <Card
              key={ card.idDrink }
              title={ card.strDrink }
              img={ card.strDrinkThumb }
              index={ i }
              id={ card.idDrink }
              type="drinks"
            />
          ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
