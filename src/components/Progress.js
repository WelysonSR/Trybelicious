import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Favorite from './Favorite';
import Share from './Share';
import ingredientFilterList from '../helpers/IngredientFilter';
import './Progress.css';

function Progress() {
  const [recipe, setRecipe] = useState([]);
  const data = useSelector((state) => state);
  const { foods, drinks } = data;
  const { meals } = foods;
  const drinksData = drinks.drinks;
  const { id } = useParams();

  useEffect(() => {
    if (meals.length !== 0) {
      const meal = meals.find((MEAL) => MEAL.idMeal === id);
      setRecipe(meal);
    } else if (drinksData.length !== 0) {
      const drink = drinksData.find((DRINK) => DRINK.idDrink === id);
      setRecipe(drink);
    }
  }, [drinksData, id, meals, recipe]);

  const srcImg = recipe.strDrink ? recipe.strDrinkThumb : recipe.strMealThumb;
  const title = recipe.strDrink ? recipe.strDrink : recipe.strMeal;
  const { ingredients, quantity } = ingredientFilterList(recipe);
  const [itemChecked, setItemChecked] = useState(() => ingredients.map(() => false));

  const itemHandler = useCallback((e) => {
    const newItemChecked = [...itemChecked];
    newItemChecked[e.target.id] = !newItemChecked[e.target.id];
    setItemChecked(newItemChecked);
  }, [itemChecked]);

  console.log(itemChecked);

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
              <Share />
              <Favorite />
            </div>
            <div>
              {
                ingredients.map((ingredient, i) => (
                  <div className="ingredient__list" key={ i }>
                    <input
                      type="checkbox"
                      id={ i }
                      onChange={ itemHandler }
                    />
                    <p
                      className={ itemChecked[i] ? 'through' : '' }
                      data-testid={ `${i}-ingredient-step` }
                    >
                      {ingredient}
                    </p>
                    <p
                      className={ itemChecked[i]
                        ? 'through'
                        : '' }
                    >
                      {`${quantity[i]}`}
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
      <Footer />
    </div>
  );
}

export default Progress;
