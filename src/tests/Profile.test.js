import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const initialState = {
  user: {
    email: 'email@email.com',
  },
  foods: {
    meals: [],
    doneRecipes: [],
    favoriteRecipes: [{
      0: {
        id: '52977',
        type: 'food',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
    }],
  },
  drinks: {
    drinks: [],
  },
  allRecipes: {
    allFoodRecipes: [],
    allDrinkRecipes: [],
  },
};

const TEN_SECONDS = 10000;

describe('Testes da página Profile', () => {
  jest.setTimeout(TEN_SECONDS);
  test('Se a rota da página é /profile e se o título está correto', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/profile');

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
  });

  test(
    'Se existem os botões Done Recipes e o redirecionamento dele',
    () => {
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/profile');

      const doneRecipesButton = screen.getByRole('button', {
        name: /done recipes/i,
      });
      expect(doneRecipesButton).toBeInTheDocument();

      userEvent.click(doneRecipesButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    },
  );

  test('Se existe o botão Favorite Recipes e o redirecionamento dele', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/profile');

    const favoriteRecipesButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    expect(favoriteRecipesButton).toBeInTheDocument();

    userEvent.click(favoriteRecipesButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('Se existe o botão Logout e o redirecionamento dele', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/profile');

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
