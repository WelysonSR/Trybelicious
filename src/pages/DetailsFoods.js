import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Favorite from '../components/Favorite';
import Recommended from '../components/Recomended';
import Share from '../components/Share';
import './DetailsFoods.css';
import ingredientFilterList from '../helpers/IngredientFilter';

function DetailsFoods() {
  const history = useHistory();
  const pathname = history.location;
  const index = pathname.pathname.split('/')[2];

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals[0]);
    };
    getRecipe();
  }, [index]);

  const handleToProgress = () => {
    history.push(`/foods/${index}/in-progress`);
  };

  const { ingredients, quantity } = ingredientFilterList(recipe);

  return (
    <div>
      {
        (recipe.length !== 0) && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt="imagem-receita"
              className="details-img"
            />
            <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
            <p data-testid="recipe-category">{ recipe.strCategory }</p>
            <Share type="foods" id={ index } />
            <Favorite infoRecipe={ recipe } id={ index } type="food" />
            <h3 data-testid={ `${index}-ingredient-name-and-measure` }>Ingredientes</h3>
            <ul>
              {
                ingredients.map((ingredient, i) => (
                  <li
                    key={ i }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {/* ${!quantity[i] ? '' : <span>-</span> - ${quantity[i] || ''} } */}
                    {`${ingredient} - ${quantity[i] || ''}`}
                  </li>
                ))
              }
            </ul>
            <h3 data-testid="instructions">Instruções</h3>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <iframe
              data-testid="video"
              width="100%"
              height="210"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
            />
            <Recommended type="foods" api="Drink" />
            <button
              data-testid="start-recipe-btn"
              type="button"
              onClick={ handleToProgress }
              className="recipe"
            >
              Start Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}

export default DetailsFoods;
