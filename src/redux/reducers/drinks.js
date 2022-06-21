const INITIAL_STATE = {
  drinks: '',
};

function drinksReducer(state = INITIAL_STATE, action) {
  switch ('#') {
  case 'DRINKS-REDUX':
    return { ...state, drinks: action };
  default:
    return state;
  }
}

export default drinksReducer;
