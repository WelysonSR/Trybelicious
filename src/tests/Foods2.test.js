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

describe('Continuação dos testes da página foods', () => {
  jest.setTimeout(TEN_SECONDS);
  test('Se ao clicar nos filtros, renderiza as receitas corretas', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/foods');

    const chickenFilter = await screen.findByRole('button', { name: /chicken/i });
    expect(chickenFilter).toBeInTheDocument();

    userEvent.click(chickenFilter);

    await wait(() => {
      expect(screen.getByText(/ayam percik/i)).toBeInTheDocument();
    });

    const beefFilter = await screen.findByRole('button', { name: /beef/i });
    expect(beefFilter).toBeInTheDocument();

    userEvent.click(beefFilter);

    await wait(() => {
      expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
    });

    const breakFastFilter = await screen.findByRole('button', { name: /breakfast/i });
    expect(breakFastFilter).toBeInTheDocument();

    userEvent.click(breakFastFilter);

    await wait(() => {
      expect(screen.getByText(/breakfast potatoes/i)).toBeInTheDocument();
    });

    const dessertFilter = await screen.findByRole('button', { name: /dessert/i });
    expect(dessertFilter).toBeInTheDocument();

    userEvent.click(dessertFilter);

    await wait(() => {
      expect(screen.getByText(/apam balik/i)).toBeInTheDocument();
    });

    const goatFilter = await screen.findByRole('button', { name: /goat/i });
    expect(goatFilter).toBeInTheDocument();

    userEvent.click(goatFilter);

    await wait(() => {
      expect(screen.getByText(/mbuzi choma/i)).toBeInTheDocument();
    });

    const allFilter = await screen.findByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    userEvent.click(allFilter);

    await wait(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
  });

  test(
    'Se a resposta de 1 filtro for apenas 1 receita, redireciona para detalhes da mesma',
    async () => {
      renderWithRouterAndRedux(<App />, initialState, '/foods');

      const searchButton = screen.getByRole('img', { name: /search/i });
      expect(searchButton).toBeInTheDocument();

      userEvent.click(searchButton);

      const inputSearch = screen.getByTestId('search-input');
      expect(inputSearch).toBeInTheDocument();

      userEvent.type(inputSearch, 'y');

      const firstLetterButton = screen.getByTestId('first-letter-search-radio');
      expect(firstLetterButton).toBeInTheDocument();

      userEvent.click(firstLetterButton);

      const submitSearchButton = screen.getByTestId('exec-search-btn');
      expect(submitSearchButton).toBeInTheDocument();

      userEvent.click(submitSearchButton);

      await wait(() => {
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      });
    },
  );
});
