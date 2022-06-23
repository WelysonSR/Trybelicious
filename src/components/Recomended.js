import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Recommended({ type }) {
  const [recommendation, setRecomendation] = useState([]);

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
  }, []);

  const maxLength = 6;
  const itens = recommendation.filter((rec, i) => i < maxLength);
  console.log(itens);

  return (
    <div className="carousel">
      {
        itens.map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
            <p>{ food.strAlcoholic }</p>
            <h2 data-testid={ `${index}-recomendation-title` }>{food.strMeal}</h2>
          </div>
        ))
      }
    </div>
  );
}

Recommended.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recommended;
