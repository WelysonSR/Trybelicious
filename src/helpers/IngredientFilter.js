function ingredientFilterList(recipe) {
  const ingredients = Object.entries(recipe)
    .filter((item) => item[0].includes('strIngredient'))
    .map((itens) => itens[1])
    .filter((e) => (e));
  const quantity = Object.entries(recipe)
    .filter((item) => item[0].includes('strMeasure'))
    .map((itens) => itens[1])
    .filter((e) => (e));
  return { ingredients, quantity };
}
export default ingredientFilterList;
