import {
  SAVE_INGREDIENT,
  SAVE_FAVORIT, SAVE_DONERECIPE,
  SAVE_RECIPE_EXPLORE,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  doneRecipes: [],
  favoriteRecipes: [],
  recipeForExplore: [],
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INGREDIENT:
    return { ...state, meals: action.action };
  case SAVE_FAVORIT:
    return { ...state, favoriteRecipes: action.action };
  case SAVE_DONERECIPE:
    return { ...state, doneRecipes: action.action };
  case SAVE_RECIPE_EXPLORE:
    return { ...state, recipeForExplore: action.action };
  default:
    return state;
  }
}

export default foodsReducer;
