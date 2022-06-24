import { SAVE_INGREDIENT, SAVE_FAVORIT } from '../actions';

const INITIAL_STATE = {
  meals: [],
  doneRecipes: [],
  favoriteRecipes: [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ],
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INGREDIENT:
    return { ...state, meals: action.action };
  case SAVE_FAVORIT:
    return { ...state, favoriteRecipes: action.action };
  default:
    return state;
  }
}

export default foodsReducer;
