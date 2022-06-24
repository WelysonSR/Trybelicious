export const EMAIL_REDUX = 'EMAIL-REDUX';
export const SAVE_INGREDIENT = 'SAVE_INGREDIENT';
export const SAVE_DRINKS = 'SAVE_DRINKS';
export const SAVE_FAVORIT = 'SAVE_FAVORIT';

export const saveEmail = (action) => ({
  type: EMAIL_REDUX,
  action,
});

export const saveIngredient = (action) => ({
  type: SAVE_INGREDIENT,
  action,
});

export const saveDrinks = (action) => ({
  type: SAVE_DRINKS,
  action,
});

export const saveFavorit = (action) => ({
  type: SAVE_FAVORIT,
  action,
});

export const fetchIngredient = (param, title) => async (dispatch) => {
  if (title === 'Foods') {
    const ingredientFoods = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
    const response = await fetch(ingredientFoods);
    const { meals } = await response.json();
    dispatch(saveIngredient(meals));
  } else {
    const ingredientDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`;
    const response = await fetch(ingredientDrinks);
    const { drinks } = await response.json();
    dispatch(saveDrinks(drinks));
  }
};

export const fetchName = (param, title) => async (dispatch) => {
  if (title === 'Foods') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`);
    const { meals } = await response.json();
    dispatch(saveIngredient(meals));
  } else {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`);
    const { drinks } = await response.json();
    dispatch(saveDrinks(drinks));
  }
};

export const fetchFirstLetter = (param, title) => async (dispatch) => {
  if (title === 'Foods') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`);
    const { meals } = await response.json();
    dispatch(saveIngredient(meals));
  } else {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${param}`);
    const { drinks } = await response.json();
    dispatch(saveDrinks(drinks));
  }
};
