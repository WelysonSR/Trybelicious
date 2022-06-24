// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Header from '../components/Header';
// import Profile from '../images/profileIcon.svg';
// import Card from '../components/Card';


// function Explore() {
//   const globalRecipes = useSelector((state) => state.allRecipes);
//   const [recipes, setRecipes] = useState([]);
//   const [recipeType, setRecipeType] = useState('');
//   const dispatch = useDispatch();

//   const chooseRecipeType = (type) => {
//     setRecipeType(type);
//     dispatch(fetchAllRecipes(type));
//   };

//   useEffect(() => {
//     // const limit = 11;
//     // const limitedRecipes = globalRecipes.filter((_recipes, index) => index <= limit);
//     setRecipes(globalRecipes);
//     console.log(globalRecipes);
//   }, [globalRecipes, recipes]);

//   return (
//     <div>
//       <Header img1={ Profile } title="Explore" />
//       <button
//         type="submit"
//         onClick={ () => chooseRecipeType('foods') }
//       >
//         Explore Foods
//       </button>
//       <button
//         type="submit"
//         onClick={ () => chooseRecipeType('drinks') }
//       >
//         Explore Drinks
//       </button>
//       {/* {
//         recipeType === 'foods' && (
//           <section>
//             {recipes.map((recipe, index) => (
//               <Card
//                 key={ recipe.idMeal }
//                 img={ recipe.strMealThumb }
//                 title={ recipe.strMeal }
//                 index={ index }
//               />
//             ))}
//           </section>
//         )
//       }
//       {
//         recipeType === 'drinks' && (
//           <section>
//             {recipes.map((recipe, index) => (
//               <Card
//                 key={ recipe.idDrink }
//                 title={ recipe.strDrink }
//                 img={ recipe.strDrinkThumb }
//                 index={ index }
//               />
//             ))}
//           </section>
//         )
//       } */}

//     </div>
//   );
// }

// export default Explore;
