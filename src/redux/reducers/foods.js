const INITIAL_STATE = {
  foods: '',
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch ('#') {
  case 'FOODS-REDUX':
    return { ...state, foods: action };
  default:
    return state;
  }
}

export default foodsReducer;
