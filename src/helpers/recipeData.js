export function doneRecipeHandler(recipe, type, doneDate) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const done = {
    id: recipe.idMeal || recipe.idDrink,
    type: type.split('s')[0],
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate,
    tags: recipe.strTags || '',
  };
  const newDoneRecipe = [...doneRecipes, done];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipe));
}

export function progressRecipes(recipe, type, itemChecked) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  let newInProgressRecipes = { ...inProgressRecipes };
  if (type === 'drinks') {
    newInProgressRecipes = {
      cocktails: {
        ...inProgressRecipes.cocktails,
        [recipe.idDrink]: [itemChecked],
      },
    };
  } else if (type === 'foods') {
    newInProgressRecipes = {
      meals: {
        ...inProgressRecipes.meals,
        [recipe.idMeal]: [itemChecked],
      },
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
}
