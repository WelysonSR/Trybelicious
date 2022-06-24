import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import allRecipes from './allRecipes';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
  allRecipes,
});

export default rootReducer;
