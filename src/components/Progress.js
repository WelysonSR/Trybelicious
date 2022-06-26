import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import Favorite from './Favorite';
import Share from './Share';
import ingredientFilterList from '../helpers/IngredientFilter';
import './Progress.css';

function Progress() {
  const [recipe, setRecipe] = useState([]);
  const [foodOrDrink, setFoodOrDrink] = useState('');
  const { id } = useParams();

  const history = useHistory();
  const pathname = history.location;
  const type = pathname.pathname.split('/')[1];

  useEffect(() => {
    const getRecipe = async () => {
      if (type === 'foods') {
        setFoodOrDrink('foods');
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setRecipe(data.meals[0]);
      } else if (type === 'drinks') {
        setFoodOrDrink('drinks');
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setRecipe(data.drinks[0]);
      }
    };
    getRecipe();
  }, [id, type]);

  const srcImg = recipe.strDrink ? recipe.strDrinkThumb : recipe.strMealThumb;
  const title = recipe.strDrink ? recipe.strDrink : recipe.strMeal;
  const { ingredients, quantity } = ingredientFilterList(recipe);
  const [itemChecked, setItemChecked] = useState(() => ingredients.map(() => false));

  const itemHandler = useCallback((e) => {
    const newItemChecked = [...itemChecked];
    newItemChecked[e.target.id] = !newItemChecked[e.target.id];
    setItemChecked(newItemChecked);
  }, [itemChecked]);

  return (
    <div>
      {
        recipe
        && (
          <div>
            <img src={ srcImg } data-testid="recipe-photo" alt={ title } />
            <div>
              <h1 data-testid="recipe-title">
                { title }
              </h1>
              <h2 data-testid="recipe-category">
                {
                  recipe.strCategory
                }
              </h2>
              <Share type={ foodOrDrink } id={ id } />
              <Favorite infoRecipe={ recipe } id={ id } type={ foodOrDrink } />
            </div>
            <div>
              {
                ingredients.map((ingredient, i) => (
                  <div
                    data-testid={ `${i}-ingredient-step` }
                    className="ingredient__list"
                    key={ i }
                  >
                    <input
                      type="checkbox"
                      id={ i }
                      onChange={ itemHandler }
                    />
                    <p
                      className={ itemChecked[i] ? 'through' : '' }
                    >
                      {ingredient}
                    </p>
                    <p
                      className={ itemChecked[i]
                        ? 'through'
                        : '' }
                    >
                      {'   '}
                      {`${quantity[i] || ''}`}
                    </p>
                  </div>
                ))
              }
            </div>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
            <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
          </div>
        )
      }
    </div>
  );
}

export default Progress;
