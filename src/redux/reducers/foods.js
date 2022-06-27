import { SAVE_INGREDIENT, SAVE_FAVORIT, SAVE_DONERECIPE } from '../actions';

const INITIAL_STATE = {
  meals: [],
  doneRecipes: [],
  favoriteRecipes: [],
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INGREDIENT:
    return { ...state, meals: action.action };
  case SAVE_FAVORIT:
    return { ...state, favoriteRecipes: action.action };
  case SAVE_DONERECIPE:
    return { ...state, doneRecipes: action.action };
  default:
    return state;
  }
}

export default foodsReducer;
