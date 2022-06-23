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

  console.log(recommendation);

  return (
    <div>
      <h1>Recommended</h1>
    </div>
  );
}

Recommended.propTypes = {
  type: PropTypes.string.isRequired,
};

// data-testid="${index}-recomendation-title"

export default Recommended;
