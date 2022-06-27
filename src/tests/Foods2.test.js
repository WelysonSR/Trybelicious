import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const TEN_SECONDS = 10000;

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

describe('Continuação dos testes da página foods', () => {
  jest.setTimeout(TEN_SECONDS);
  test('Se ao clicar no filtro "chicken", renderiza as receitas corretas', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/foods');

    const chickenButton = await screen.findByRole('button', { name: /chicken/i });
    expect(chickenButton).toBeInTheDocument();

    userEvent.click(chickenButton);

    await wait(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
  });
});
