import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function Favorite({ infoRecipe, id, type }) {
  const [isFav, setIsFav] = useState(true);
  const [verifyFav, setVerifyFav] = useState(false);

  const handleFavorite = useCallback(() => {
    setIsFav(!isFav);
  }, [isFav]);

  useEffect(() => {
    const allRecipeFavorites = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    allRecipeFavorites.forEach((item) => {
      if (item.id === id) {
        setIsFav(false);
      }
    });
  }, [id]);

  const favRecipe = {
    id: infoRecipe.idMeal || infoRecipe.idDrink,
    type: type.split('s')[0],
    nationality: infoRecipe.strArea || '',
    category: infoRecipe.strCategory,
    alcoholicOrNot: infoRecipe.strAlcoholic || '',
    name: infoRecipe.strMeal || infoRecipe.strDrink,
    image: infoRecipe.strMealThumb || infoRecipe.strDrinkThumb,
  };

  useEffect(() => {
    if (!isFav) {
      const allRecipeFavorites = JSON.parse(localStorage
        .getItem('favoriteRecipes')) || [];
      const newRecipeFavorites = allRecipeFavorites.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...newRecipeFavorites, favRecipe]));
      setVerifyFav(!verifyFav);
    }
    if (verifyFav) {
      const allRecipeFavorites = JSON.parse(localStorage
        .getItem('favoriteRecipes')) || [];
      const newRecipeFavorites = allRecipeFavorites.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...newRecipeFavorites]));
      setVerifyFav(!verifyFav);
    }
  }, [infoRecipe, isFav, id]);

  return (
    <div>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ isFav ? whiteHeartIcon : blackHeartIcon }
          alt="favorite-icon"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

Favorite.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  infoRecipe: PropTypes.shape({
  }),
}.isRequired;
