const INITIAL_STATE = {
  meals: [],
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_INGREDIENT':
    return { ...state, meals: action };
  default:
    return state;
  }
}

export default foodsReducer;
