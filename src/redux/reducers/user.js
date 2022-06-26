import { EMAIL_REDUX } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_REDUX:
    return { ...state, email: action.action };
  default:
    return state;
  }
}

export default userReducer;
