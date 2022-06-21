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

export const fetchIngredient = (param) => async (dispatch) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`);
  const { meals } = await response.json();
  dispatch(saveIngredient(meals));
};

export const fetchName = (param) => async (dispatch) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`);
  const data = await response.json();
  dispatch(saveIngredient(data));
};

export const fetchFirstLetter = (param) => async (dispatch) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`);
  const data = await response.json();
  dispatch(saveIngredient(data));
};
