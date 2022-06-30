import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const TEN_SECONDS = 10000;

const initialState = {
  user: {
    email: 'teste@teste.com',
  },
  foods: {
    meals: [],
    doneRecipes: [],
  },
  drinks: {
    drinks: [],
  },
};

describe('Continuação dos testes da página drinks', () => {
  jest.setTimeout(TEN_SECONDS);
  test('Se ao clicar nos filtros, renderiza as receitas corretas', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');

    const ordinaryFilter = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(ordinaryFilter).toBeInTheDocument();

    userEvent.click(ordinaryFilter);

    await wait(() => {
      expect(screen.getByText(/3-mile long island iced tea/i)).toBeInTheDocument();
    });

    const cocktailFilter = await screen.findByRole('button', { name: /cocktail/i });
    expect(cocktailFilter).toBeInTheDocument();

    userEvent.click(cocktailFilter);

    await wait(() => {
      expect(screen.getByText(/belmont/i)).toBeInTheDocument();
    });

    const shakeFilter = await screen.findByRole('button', { name: /shake/i });
    expect(shakeFilter).toBeInTheDocument();

    userEvent.click(shakeFilter);

    await wait(() => {
      expect(screen.getByText(/avalanche/i)).toBeInTheDocument();
    });

    const otherFilter = await screen.findByRole('button', { name: /other\/unknown/i });
    expect(otherFilter).toBeInTheDocument();

    userEvent.click(otherFilter);

    await wait(() => {
      expect(screen.getByText(/a piece of ass/i)).toBeInTheDocument();
    });

    const cocoaFilter = await screen.findByRole('button', { name: /cocoa/i });
    expect(cocoaFilter).toBeInTheDocument();

    userEvent.click(cocoaFilter);

    await wait(() => {
      expect(screen.getByText(/castillian hot chocolate/i)).toBeInTheDocument();
    });

    const allFilter = await screen.findByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    userEvent.click(allFilter);

    await wait(() => {
      expect(screen.getByText(/gg/i)).toBeInTheDocument();
    });
  });

  test(
    'Se a resposta de 1 filtro for apenas 1 receita, redireciona para detalhes da mesma',
    async () => {
      renderWithRouterAndRedux(<App />, initialState, '/drinks');

      const searchButton = screen.getByRole('img', { name: /search/i });
      expect(searchButton).toBeInTheDocument();

      userEvent.click(searchButton);

      const inputSearch = screen.getByTestId('search-input');
      expect(inputSearch).toBeInTheDocument();

      userEvent.type(inputSearch, 'abc');

      const nameRadioButton = screen.getByTestId('name-search-radio');
      expect(nameRadioButton).toBeInTheDocument();

      userEvent.click(nameRadioButton);

      const submitSearchButton = screen.getByTestId('exec-search-btn');
      expect(submitSearchButton).toBeInTheDocument();

      userEvent.click(submitSearchButton);

      await wait(() => {
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      });
    },
  );
});
