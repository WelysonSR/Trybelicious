import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Recommended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetailsFoods.css';

// oi

function DetailsFoods() {
  const history = useHistory();
  const pathname = history.location;
  const index = pathname.pathname.split('/')[2];

  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals[0]);
    };
    getRecipe();
  }, [index]);

  return (
    <div>
      {
        recipe && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt="imagem-receita"
              className="details-img"
            />
            <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
            <button data-testid="share-btn" type="button">
              <img src={ shareIcon } alt="share-icon" />
            </button>
            <button data-testid="favorite-btn" type="button">
              <img src={ whiteHeartIcon } alt="favorite-icon" />
            </button>
            <p data-testid="recipe-category">{ recipe.strCategory }</p>
            <h3 data-testid={ `${index}-ingredient-name-and-measure` }>Ingredientes</h3>
            <ul>
              {
                Object.entries(recipe)
                  .filter((item) => item[0].includes('strIngredient'))
                  .map((itens, i) => <li key={ i }>{ itens[1] }</li>)
                  .filter((e) => e.props.children !== '')
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
            <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
          </div>
        )
      }
    </div>
  );
}

export default DetailsFoods;
