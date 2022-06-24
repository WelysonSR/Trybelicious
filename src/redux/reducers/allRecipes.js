import { SAVE_FOODS_RECIPES, SAVE_DRINKS_RECIPES } from '../actions';

const INITIAL_STATE = {
  allFoodRecipes: [],
  allDrinksRecipes: [],
};

function allRecipesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_FOODS_RECIPES:
    return { ...state, allFoodRecipes: action.action };
  case SAVE_DRINKS_RECIPES:
    return { ...state, allDrinksRecipes: action.action };
  default:
    return state;
  }
}

export default allRecipesReducer;
