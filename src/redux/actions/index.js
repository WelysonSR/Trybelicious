export const EMAIL_REDUX = 'EMAIL-REDUX';
export const SAVE_INGREDIENT = 'SAVE_INGREDIENT';
export const SAVE_DRINKS = 'SAVE_DRINKS';
export const SAVE_FAVORIT = 'SAVE_FAVORIT';
export const SAVE_FOODS_RECIPES = 'SAVE_FOODS_RECIPES';
export const SAVE_DRINKS_RECIPES = 'SAVE_DRINKS_RECIPES';
export const SAVE_DONERECIPE = 'SAVE_DONERECIPE';
export const SAVE_RECIPE_EXPLORE = 'SAVE_RECIPE_EXPLORE';

export const saveRecipesExplore = (action) => ({
  type: SAVE_RECIPE_EXPLORE,
  action,
});

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

export const saveAllFoodsRecipes = (action) => ({
  type: SAVE_FOODS_RECIPES,
  action,
});

export const saveAllDrinksRecipes = (action) => ({
  type: SAVE_DRINKS_RECIPES,
  action,
});

export const saveDoneRecipes = (action) => ({
  type: SAVE_DONERECIPE,
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

export const fetchAllFoodRecipes = () => async (dispatch) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  dispatch(saveAllFoodsRecipes(meals));
};

export const fetchAllDrinksRecipes = () => async (dispatch) => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { cocktails } = await response.json();
  dispatch(saveAllDrinksRecipes(cocktails));
};
