import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Drinks from '../pages/Drinks';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import oneDrink from '../../cypress/mocks/oneDrink';

const TEN_SECONDS = 10000;
const SUBMIT_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';

describe('Continuação dos testes da página Drinks', () => {
  jest.setTimeout(TEN_SECONDS);

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  test('Se é exibido um alerta quando não é encontrada uma receita', async () => {
    renderWithRouterAndRedux(<Drinks />, {}, '/drinks');

    global.alert = jest.fn();

    await act(async () => {
      const searchBtn = screen.getByRole('img', { name: /search/i });
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);

      const searchInput = await screen.findByRole('textbox');
      expect(searchInput).toBeInTheDocument();

      const submitBtn = await screen.findByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
      expect(submitBtn).toBeInTheDocument();

      const nameRadioFilter = await screen.findByTestId('name-search-radio');
      expect(nameRadioFilter).toBeInTheDocument();

      userEvent.type(searchInput, 'arroz');
      userEvent.click(nameRadioFilter);
      userEvent.click(submitBtn);
      await wait(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });
  });

  test(
    'Se a resposta de 1 filtro for apenas 1 receita, redireciona para detalhes da mesma',
    async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(oneDrink) });

      await act(async () => {
        const { history } = renderWithRouterAndRedux(<Drinks />, {}, '/drinks');

        const searchBtn = screen.getByRole('img', { name: /search/i });
        expect(searchBtn).toBeInTheDocument();

        userEvent.click(searchBtn);

        const searchInput = await screen.findByRole('textbox');
        expect(searchInput).toBeInTheDocument();

        const submitBtn = await screen.findByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
        expect(submitBtn).toBeInTheDocument();

        const nameRadioFilter = await screen.findByTestId('name-search-radio');
        expect(nameRadioFilter).toBeInTheDocument();

        userEvent.type(searchInput, 'aquamarine');
        userEvent.click(nameRadioFilter);
        userEvent.click(submitBtn);

        await wait(() => {
          const { pathname } = history.location;
          expect(pathname).toBe('/drinks/178319');
        });
      });
    },
  );
});
