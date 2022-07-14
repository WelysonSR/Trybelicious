import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Favorite from '../components/Favorite';
import Recommended from '../components/Recomended';
import Share from '../components/Share';
import ingredientFilterList from '../helpers/IngredientFilter';
import styles from './DetailsDrinks.module.css';

function DetailsDrinks() {
  const history = useHistory();
  const pathname = history.location;
  const index = pathname.pathname.split('/')[2];
  console.log(index);

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${index}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.drinks[0]);
    };
    getRecipe();
  }, [index]);

  const handleToProgress = () => {
    history.push(`/drinks/${index}/in-progress`);
  };

  const { ingredients, quantity } = ingredientFilterList(recipe);

  return (
    <div className={ styles.container }>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt="imagem-receita"
        className={ styles.img }
      />
      <div className={ styles.divName }>
        <section className={ styles.sectionName }>
          <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          <p data-testid="recipe-category">
            { `${recipe.strCategory} / ${recipe.strAlcoholic}` }
          </p>
        </section>
        <section className={ styles.share }>
          <Share type="drinks" id={ index } />
          <Favorite infoRecipe={ recipe } id={ index } type="drink" />
        </section>
      </div>
      <main className={ styles.main }>
        <h3 data-testid={ `${index}-ingredient-name-and-measure` }>Ingredients</h3>
        <ul>
          {
            ingredients.map((ingredient, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                { quantity[i] ? `${ingredient} - ${quantity[i]}` : ingredient }
              </li>
            ))
          }
        </ul>
        <section className={ styles.instruction }>
          <h3 data-testid="instructions">Instruções</h3>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </section>
        <Recommended type="drinks" api="Meal" typeRecomended="foods" />
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleToProgress }
          className="recipe"
        >
          Start Recipe
        </button>
      </main>
    </div>
  );
}

export default DetailsDrinks;
