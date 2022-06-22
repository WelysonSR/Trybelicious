import { SAVE_DRINKS } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_DRINKS:
    return { ...state, drinks: action.action };
  default:
    return state;
  }
}

export default drinksReducer;
