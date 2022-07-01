import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import styles from './ExploreNationalities.module.css';

function ExploreNationalities() {
  const [selectedNationality, setSelectedNationality] = useState('All');
  const [nationalities, setNationalities] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  const fetchIngredients = async () => {
    const MAXIMUMI_ITEMS = 12;
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const { meals } = await (await fetch(URL)).json();
    setIngredients(meals.filter((_meal, index) => index < MAXIMUMI_ITEMS));
  };

  useEffect(() => {
    const fetchArea = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals } = await (await fetch(URL)).json();
      setNationalities(meals);
    };
    fetchArea();
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    if (selectedNationality === 'All') {
      fetchIngredients();
    } else {
      const MAXIMUMI_ITEMS = 12;
      const fetchArea = async () => {
        const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedNationality}`;
        const { meals } = await (await fetch(URL)).json();
        setIngredients(meals.filter((_meal, index) => index < MAXIMUMI_ITEMS));
      };
      fetchArea();
    }
  }, [selectedNationality]);

  return (
    <>
      <Header img1={ Profile } title="Explore Nationalities" img2={ Search } />
      <div className={ styles.container }>
        <select
          className={ styles.all }
          data-testid="explore-by-nationality-dropdown"
          onChange={ ({ target }) => setSelectedNationality(target.value) }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {nationalities.map((national) => (
            <option
              key={ national.strArea }
              value={ national.strArea }
              data-testid={ `${national.strArea}-option` }
            >
              {national.strArea}
            </option>
          ))}
        </select>
        <div className={ styles.cardAll }>
          {ingredients.length === 0 ? (<h6>Loading...</h6>)
            : ingredients.map((ingredient, i) => (
              <Link
                to={ `/foods/${ingredient.idMeal}` }
                key={ i }
                data-testid={ `${i}-recipe-card` }
                className="card"
              >
                <img
                  src={ ingredient.strMealThumb }
                  alt={ ingredient.strMeal }
                  data-testid={ `${i}-card-img` }
                />
                <h6 data-testid={ `${i}-card-name` }>{ingredient.strMeal}</h6>
              </Link>
            ))}
        </div>
        <Footer />
      </div>

    </>
  );
}

export default ExploreNationalities;
