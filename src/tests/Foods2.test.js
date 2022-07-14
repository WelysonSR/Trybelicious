import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Foods from '../pages/Foods';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import oneMeal from '../../cypress/mocks/oneMeal';

const TEN_SECONDS = 10000;
const SUBMIT_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';

describe('Continuação dos testes da página Foods', () => {
  jest.setTimeout(TEN_SECONDS);

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  test('Se é exibido um alerta quando não é encontrada uma receita', async () => {
    renderWithRouterAndRedux(<Foods />, {}, '/foods');

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
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mealCategories) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(oneMeal) });

      await act(async () => {
        const { history } = renderWithRouterAndRedux(<Foods />, {}, '/foods');

        const searchBtn = screen.getByRole('img', { name: /search/i });
        expect(searchBtn).toBeInTheDocument();

        userEvent.click(searchBtn);

        const searchInput = await screen.findByRole('textbox');
        expect(searchInput).toBeInTheDocument();

        const submitBtn = await screen.findByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
        expect(submitBtn).toBeInTheDocument();

        const nameRadioFilter = await screen.findByTestId('name-search-radio');
        expect(nameRadioFilter).toBeInTheDocument();

        userEvent.type(searchInput, 'spice arrabiata');
        userEvent.click(nameRadioFilter);
        userEvent.click(submitBtn);

        await wait(() => {
          const { pathname } = history.location;
          expect(pathname).toBe('/foods/52771');
        });
      });
    },
  );
});
