import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function Recommended({ type, api }) {
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
    <Carousel>
      {
        itens && itens.map((food, index) => (
          <Carousel.Item
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-100"
              src={ food[Thumb] }
              alt={ food[Name] }
            />
            <Carousel.Caption className="text-colo">
              <p>{ food.strAlcoholic }</p>
              <h2 data-testid={ `${index}-recomendation-title` }>
                { food[Name] }
              </h2>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

Recommended.propTypes = {
  type: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
};

export default Recommended;
