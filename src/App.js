import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Foods from './components/Foods';
import FoodsProvider from './context/FoodsProvider';
import DrinksProvider from './context/DrinksProvider';

function App() {
  return (
    <FoodsProvider>
      <DrinksProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
          </Switch>
        </BrowserRouter>
      </DrinksProvider>
    </FoodsProvider>
  );
}

export default App;
