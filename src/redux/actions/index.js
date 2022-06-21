export const EMAIL_REDUX = 'EMAIL-REDUX';
export const SAVE_INGREDIENT = 'SAVE_INGREDIENT';

export const saveEmail = (action) => ({
  type: EMAIL_REDUX,
  action,
});

export const saveIngredient = (action) => ({
  type: SAVE_INGREDIENT,
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
    const { cocktails } = await response.json();
    dispatch(saveIngredient(cocktails));
  }
};

export const fetchName = (param, title) => async (dispatch) => {
  if (title === 'Foods') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`);
    const data = await response.json();
    dispatch(saveIngredient(data));
  } else {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`);
    const data = await response.json();
    dispatch(saveIngredient(data));
  }
};

export const fetchFirstLetter = (param, title) => async (dispatch) => {
  if (title === 'Foods') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`);
    const data = await response.json();
    dispatch(saveIngredient(data));
  } else {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${param}`);
    const data = await response.json();
    dispatch(saveIngredient(data));
  }
};
