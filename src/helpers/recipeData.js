// import React, { useCallback, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// import { fetchIngredient, fetchName, fetchFirstLetter } from '../redux/actions';

// function doneRecipeHandler() {

// }

function doneRecipeHandler(recipe, type, itemChecked) {
  // const [isDone, setIsDone] = useState(true);
  // const [verifyDone, setVerifyDone] = useState(false);

  if (type === 'drinks') {
    const newInProgressRecipes = {
      cocktails: {
        [recipe.idDrink]: [itemChecked],
      },
    };
    // console.log(itemChecked);
  } else if (type === 'foods') {
    const newInProgressRecipes = {
      meals: {
        [recipe.idMeal]: [itemChecked],
      },
    };
    // console.log(itemChecked);
  }
}

export default doneRecipeHandler;
