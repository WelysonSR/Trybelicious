import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Recommended from '../components/Recomended';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailsDrinks() {
  const history = useHistory();
  const pathname = history.location;
  const index = pathname.pathname.split('/')[2];

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${index}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.drinks[0]);
    };
    getRecipe();
  }, []);

  console.log(recipe);
  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="imagem-receita" />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite-icon" />
      </button>
      <p data-testid="recipe-category">
        { `${recipe.strCategory} / ${recipe.strAlcoholic}` }
      </p>
      <h3 data-testid={ `${index}-ingredient-name-and-measure` }>Ingredientes</h3>
      <ul>
        {
          Object.entries(recipe)
            .filter((item) => item[0].includes('strIngredient'))
            .map((itens, i) => <li key={ i }>{ itens[1] }</li>)
            .filter((e) => e.props.children !== null)
        }
      </ul>
      <h3 data-testid="instructions">Instruções</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recommended type="drinks" />
      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </div>
  );
}

export default DetailsDrinks;
