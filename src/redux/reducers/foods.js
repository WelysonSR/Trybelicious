import { SAVE_INGREDIENT } from '../actions';

const INITIAL_STATE = {
  meals: [],
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INGREDIENT:
    return { ...state, meals: action.action };
  default:
    return state;
  }
}

export default foodsReducer;
