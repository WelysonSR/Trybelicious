import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveRecipesExplore } from '../redux/actions';
import './Card.css';

function CardIngredients({ index, type, recipe }) {
  const dispatch = useDispatch();
  const [img, setImg] = useState('');

  useEffect(() => {
    if (type === 'foods') {
      setImg(`https://www.themealdb.com/images/ingredients/${recipe.strIngredient}-Small.png`);
    } else {
      setImg(`https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient1}-Small.png`);
    }
  }, []);

  const headleClick = async () => {
    const MAXIMUMI_ITEMS = 12;
    if (type === 'foods') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe.strIngredient}`;
      const { meals } = await (await fetch(url)).json();
      const ITEM = meals.filter((_item, i) => i < MAXIMUMI_ITEMS);
      dispatch(saveRecipesExplore(ITEM));
    }
    if (type === 'drinks') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipe.strIngredient1}`;
      const { drinks } = await (await fetch(url)).json();
      const ITEM = drinks.filter((_item, i) => i < MAXIMUMI_ITEMS);
      dispatch(saveRecipesExplore(ITEM));
    }
  };

  return (
    <Link
      to={ `/${type}` }
      onClick={ headleClick }
    >
      <div data-testid={ `${index}-ingredient-card` } className="card">
        <img
          className="card-img"
          data-testid={ `${index}-card-img` }
          src={ img }
          alt=""
        />
        <h6 data-testid={ `${index}-card-name` }>
          { recipe.strIngredient || recipe.strIngredient1 }
        </h6>
      </div>
    </Link>
  );
}

CardIngredients.propTypes = {
  card: PropTypes.shape(),
}.isRequired;

export default CardIngredients;
