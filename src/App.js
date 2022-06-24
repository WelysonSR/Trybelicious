import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Progress from './components/Progress';
import Explore from './pages/Explore';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';

function App() {
  return (
    <Switch>
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreIngredients }
      />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreIngredients }
      />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore" component={ Explore } />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ Progress }
      />
      <Route
        exact
        path="/foods/:id/in-progress"
        component={ Progress }
      />
      <Route path="/drinks/:id" component={ DetailsDrinks } />
      <Route path="/foods/:id" component={ DetailsFoods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
