import React from 'react';
import { useHistory } from 'react-router';
import Recommended from '../components/Recomended';

function DetailsDrinks() {
  const history = useHistory();
  const pathname = history.location;
  console.log(pathname);
  return (
    <div>
      <img data-testid="recipe-photo" src="http://placehold.it/" alt="imagem-receita" />
      <h1 data-testid="recipe-title">Título</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p data-testid="recipe-category">Texto</p>
      <li>Itens</li>
      <h3 data-testid="instructions">Instruções</h3>
      <p data-testid="instructions">Instruções</p>
      <Recommended />
      <button data-testid="start-recipe-btn" type="button">Finiciar Receita</button>
    </div>
  );
}

export default DetailsDrinks;
