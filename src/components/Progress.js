import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import Favorite from './Favorite';
import Share from './Share';
import ingredientFilterList from '../helpers/IngredientFilter';
import './Progress.css';
import { doneRecipeHandler, progressRecipes } from '../helpers/recipeData';

function Progress() {
  const current = new Date();
  const month = current.getUTCMonth() + 1;
  const day = current.getUTCDay();
  const year = current.getUTCFullYear();
  const [recipe, setRecipe] = useState([]);
  const [foodOrDrink, setFoodOrDrink] = useState('');
  const { id } = useParams();
  const [doneRecipe] = useState(false);
  const history = useHistory();
  const pathname = history.location;
  const [doneDate, setDoneDate] = useState('');
  const type = pathname.pathname.split('/')[1];
  const [itemChecked, setItemChecked] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [isDoneDisable, setIsDoneDisable] = useState(true);
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

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

  useEffect(() => {
    const { ingredients, quantity } = ingredientFilterList(recipe);
    setIngredientList([ingredients, quantity]);
    if (ingredients.length > 0) {
      setItemChecked(ingredients.map(() => false));
    }
  }, [recipe]);

  function allArrTrue(array) {
    return array.every((item) => !item);
  }

  const srcImg = recipe.strDrink ? recipe.strDrinkThumb : recipe.strMealThumb;
  const title = recipe.strDrink ? recipe.strDrink : recipe.strMeal;

  const itemHandler = useCallback((e) => {
    const newItemChecked = [...itemChecked];
    newItemChecked[e.target.id] = !newItemChecked[e.target.id];
    setItemChecked(newItemChecked);
    progressRecipes(recipe, type, itemChecked);
    setIsDoneDisable(allArrTrue(itemChecked));
  }, [doneRecipe, itemChecked, isDoneDisable]);

  const dater = useCallback(() => {
    setDoneDate(`${day}/${month}/${year}`);
  }, [doneDate]);

  const handleDoneClick = () => {
    dater();
    doneRecipeHandler(recipe, type, doneDate);
    history.push('/done-recipes');
  };

  return (
    <div>
      {
        ingredientList[0]
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
                ingredientList[0].map((ingredient, i) => (
                  <div
                    data-testid={ `${i}-ingredient-step` }
                    className="ingredient__list"
                    key={ i }
                  >
                    <input
                      type="checkbox"
                      id={ i }
                      onChange={ (e) => itemHandler(e, i) }
                      // checked={ isChecked[i] }
                    />
                    <p
                      className={ itemChecked[i]
                        ? 'through'
                        : '' }
                    >
                      {
                        ingredientList[1][i]
                          ? `${ingredient} - ${ingredientList[1][i]}`
                          : ingredient
                      }
                    </p>
                  </div>
                ))
              }
            </div>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDoneDisable }
              onClick={ handleDoneClick }
            >
              Finish Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}

export default Progress;
