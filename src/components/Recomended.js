import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Recomended.module.css';

function Recommended({ type, api, typeRecomended }) {
  const [recommendation, setRecomendation] = useState([]);
  const [itens, setItens] = useState();
  const Thumb = `str${api}Thumb`;
  const Name = `str${api}`;

  useEffect(() => {
    if (type === 'foods') {
      const getFoodRecommendation = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const data = await response.json();
        setRecomendation(data.drinks);
      };
      getFoodRecommendation();
    } else if (type === 'drinks') {
      const getDrinkRecommendation = async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const data = await response.json();
        setRecomendation(data.meals);
      };
      getDrinkRecommendation();
    }
  }, [type]);

  useEffect(() => {
    const maxLength = 6;
    const itensMax = recommendation.filter((_rec, i) => i < maxLength);
    setItens(itensMax);
  }, [recommendation]);

  return (
    <>
      <h3 className={ styles.title }>Recommended</h3>
      <section className={ styles.recipeContainer }>
        {
          itens && itens.map((food, index) => (
            <Link
              key={ index }
              to={ `/${typeRecomended}/${food.idMeal || food.idDrink}` }
            >
              <div
                className={ styles.recipeCard }
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  className="tamanho-right"
                  src={ food[Thumb] }
                  alt={ food[Name] }
                />
                <p>{ food.strAlcoholic }</p>
                <h2 data-testid={ `${index}-recomendation-title` }>
                  { food[Name] }
                </h2>
              </div>
            </Link>
          ))
        }
      </section>
    </>
  );
}

Recommended.propTypes = {
  type: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  typeRecomended: PropTypes.string.isRequired,
};

export default Recommended;
