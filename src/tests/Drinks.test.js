import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Drinks from '../pages/Drinks';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import otherDrinks from '../../cypress/mocks/otherDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

const TEN_SECONDS = 10000;
const SUBMIT_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';

describe('Testes da página Drinks', () => {
  jest.setTimeout(TEN_SECONDS);

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  const expectDrinkCards = (apiReturn) => {
    const TWELVE = 12;
    apiReturn.drinks.forEach((drink, i) => {
      if (i < TWELVE) {
        expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-name`))
          .toHaveTextContent(drink.strDrink);
        expect(screen.getByTestId(`${i}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-img`))
          .toHaveAttribute('src', drink.strDrinkThumb);
      } else {
        expect(screen.queryByTestId(`${i}-recipe-card`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${i}-card-name`))
          .not.toBeInTheDocument();
        expect(screen.queryByTestId(`${i}-card-img`))
          .not.toBeInTheDocument();
      }
    });
  };

  test('Se a pagina Drinks é renderizada e se a rota é a correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', { name: 'ENTER' });

    expect(enterButton).toBeDisabled();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'abcdefgh');

    userEvent.click(enterButton);

    const drinkFooterBtn = screen.getByRole('img', { name: /drink/i });
    expect(drinkFooterBtn).toBeInTheDocument();

    userEvent.click(drinkFooterBtn);

    const { pathname } = history.location;
    await wait(() => {
      expect(pathname).toBe('/drinks');
    });
  });

  test('Se as receitas são renderizadas corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinkCategories) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

    renderWithRouterAndRedux(<Drinks />, {}, '/foods');
    await wait(() => expectDrinkCards(drinks));
  });

  test('Se o filtro por ingrediente renderiza as receitas corretas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinkCategories) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinksByIngredient),
      });

    await act(async () => {
      renderWithRouterAndRedux(<Drinks />, {}, '/drinks');

      const searchBtn = screen.getByRole('img', { name: /search/i });
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);

      const searchInput = await screen.findByRole('textbox');
      expect(searchInput).toBeInTheDocument();

      const submitBtn = await screen.findByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
      expect(submitBtn).toBeInTheDocument();

      const ingredientRadioFilter = await screen.findByTestId('ingredient-search-radio');
      expect(ingredientRadioFilter).toBeInTheDocument();

      userEvent.type(searchInput, 'light rum');
      userEvent.click(ingredientRadioFilter);
      userEvent.click(submitBtn);
      await wait(() => expectDrinkCards(drinksByIngredient));
    });
  });

  test('Se os botões de categoria são renderizados e suas funcionalidades', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinkCategories) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(ordinaryDrinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(cocktailDrinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(milkDrinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(otherDrinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(cocoaDrinks) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

    await act(async () => {
      renderWithRouterAndRedux(<Drinks />, {}, '/drinks');

      const ordinaryFilterBtn = await screen
        .findByRole('button', { name: /ordinary drink/i });
      expect(ordinaryFilterBtn).toBeInTheDocument();

      const cocktailsFilterBtn = await screen
        .findByRole('button', { name: /cocktail/i });
      expect(cocktailsFilterBtn).toBeInTheDocument();

      const shakeFilterBtn = await screen.findByRole('button', { name: /shake/i });
      expect(shakeFilterBtn).toBeInTheDocument();

      const otherFilterBtn = await screen.findByRole('button', { name: /other/i });
      expect(otherFilterBtn).toBeInTheDocument();

      const cocoaFilterBtn = await screen.findByRole('button', { name: /cocoa/i });
      expect(cocoaFilterBtn).toBeInTheDocument();

      const allFilterBtn = await screen.findByRole('button', { name: /all/i });
      expect(allFilterBtn).toBeInTheDocument();

      userEvent.click(ordinaryFilterBtn);
      await wait(() => expectDrinkCards(ordinaryDrinks));

      userEvent.click(cocktailsFilterBtn);
      await wait(() => expectDrinkCards(cocktailDrinks));

      userEvent.click(shakeFilterBtn);
      await wait(() => expectDrinkCards(milkDrinks));

      userEvent.click(otherFilterBtn);
      await wait(() => expectDrinkCards(otherDrinks));

      userEvent.click(cocoaFilterBtn);
      await wait(() => expectDrinkCards(cocoaDrinks));

      userEvent.click(allFilterBtn);
      await wait(() => expectDrinkCards(drinks));
    });
  });

  test('Se ao clicar novamente em um botão de filtro, o filtro é retirado',
    async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(ordinaryDrinks) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(drinks) });

      await act(async () => {
        renderWithRouterAndRedux(<Drinks />, {}, '/drinks');

        const ordinaryFilterBtn = await screen
          .findByRole('button', { name: /ordinary drink/i });

        userEvent.click(ordinaryFilterBtn);

        await wait(() => expectDrinkCards(ordinaryDrinks));

        userEvent.click(ordinaryFilterBtn);

        await wait(() => expectDrinkCards(drinks));
      });
    });
});
