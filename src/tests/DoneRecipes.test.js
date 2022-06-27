import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const DONE_RECIPES = '/done-recipes';

const initialState = {
  user: {
    email: {
      type: 'EMAIL-REDUX',
      action: 'teste@teste.com',
    },
  },
  foods: {
    meals: [],
    doneRecipes: [],
  },
  drinks: {
    drinks: [],
  },
};

describe('Testes da págin DoneRecipes', () => {
  test('Se a rota da página é /done-recipes e se o título está correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, DONE_RECIPES);

    const { pathname } = history.location;
    expect(pathname).toBe(DONE_RECIPES);

    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTitle).toBeInTheDocument();
  });

  test('Se existem os botões: Profile, All, Foods, Drinks', () => {
    renderWithRouterAndRedux(<App />, initialState, DONE_RECIPES);

    const profileButton = screen.getByRole('img', { name: /profile/i });
    expect(profileButton).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    const foodButton = screen.getByRole('button', { name: /food/i });
    expect(foodButton).toBeInTheDocument();

    const drinkButton = screen.getByRole('button', { name: /drink/i });
    expect(drinkButton).toBeInTheDocument();
  });

  test('Se o botão Profile redireciona para a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, DONE_RECIPES);

    const profileButton = screen.getByRole('img', { name: /profile/i });
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('O funcionamento dos botões All, Food e Drink', async () => {
    renderWithRouterAndRedux(<App />, initialState);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', { name: 'Enter' });

    expect(enterButton).toBeDisabled();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');

    expect(emailInput).toHaveValue('email@email.com');
    expect(passwordInput).toHaveValue('1234567');
    expect(enterButton).toBeEnabled();

    userEvent.click(enterButton);

    const foodsTitle = screen.getByRole('heading', { name: 'Foods' });
    expect(foodsTitle).toBeInTheDocument();

    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();

    userEvent.click(corbaRecipe);

    const corbaTitle = screen.getByRole('heading', { name: 'Corba' });
    expect(corbaTitle).toBeInTheDocument();

    // const startRecipeButton = await screen.findByRole('button', { name: /start recipe/i });
    // expect(startRecipeButton).toBeInTheDocument();
  });
});
