/* eslint-disable max-lines */
import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Foods from '../pages/Foods';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import goatMeals from '../../cypress/mocks/goatMeals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

const TEN_SECONDS = 10000;
const SUBMIT_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';

describe('Testes da página Foods', () => {
  jest.setTimeout(TEN_SECONDS);

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  const expectFoodCards = (apiReturn) => {
    const TWELVE = 12;
    apiReturn.meals.forEach((meal, i) => {
      if (i < TWELVE) {
        expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-name`))
          .toHaveTextContent(meal.strMeal);
        expect(screen.getByTestId(`${i}-card-img`)).toBeInTheDocument();
        expect(screen.getByTestId(`${i}-card-img`))
          .toHaveAttribute('src', meal.strMealThumb);
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

  test('Se a pagina Foods é renderizada e se a rota é a correta', () => {
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

    const title = screen.getByRole('heading', { name: 'Foods' });
    expect(title).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });

  test('Se as receitas são renderizadas corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mealCategories) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

    renderWithRouterAndRedux(<Foods />, {}, '/foods');
    await wait(() => expectFoodCards(meals));
  });

  test('Se o filtro por ingrediente renderiza as receitas corretas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mealCategories) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsByIngredient),
      });

    await act(async () => {
      renderWithRouterAndRedux(<Foods />, {}, '/foods');

      const searchBtn = screen.getByRole('img', { name: /search/i });
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);

      const searchInput = await screen.findByRole('textbox');
      expect(searchInput).toBeInTheDocument();

      const submitBtn = await screen.findByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
      expect(submitBtn).toBeInTheDocument();

      const ingredientRadioFilter = await screen.findByTestId('ingredient-search-radio');
      expect(ingredientRadioFilter).toBeInTheDocument();

      userEvent.type(searchInput, 'chicken');
      userEvent.click(ingredientRadioFilter);
      userEvent.click(submitBtn);
      await wait(() => expectFoodCards(mealsByIngredient));
    });
  });

  test('Se os botões de categoria são renderizados e suas funcionalidades', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mealCategories) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(beefMeals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(breakfastMeals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(chickenMeals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(dessertMeals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(goatMeals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

    await act(async () => {
      renderWithRouterAndRedux(<Foods />, {}, '/foods');

      const beefFilterBtn = await screen.findByRole('button', { name: /beef/i });
      expect(beefFilterBtn).toBeInTheDocument();

      const breakFastFilterBtn = await screen
        .findByRole('button', { name: /breakfast/i });
      expect(breakFastFilterBtn).toBeInTheDocument();

      const chickenFilterBtn = await screen.findByRole('button', { name: /chicken/i });
      expect(chickenFilterBtn).toBeInTheDocument();

      const dessertFilterBtn = await screen.findByRole('button', { name: /dessert/i });
      expect(dessertFilterBtn).toBeInTheDocument();

      const goatFilterBtn = await screen.findByRole('button', { name: /goat/i });
      expect(goatFilterBtn).toBeInTheDocument();

      const allFilterBtn = await screen.findByRole('button', { name: /all/i });
      expect(allFilterBtn).toBeInTheDocument();

      userEvent.click(beefFilterBtn);
      await wait(() => expectFoodCards(beefMeals));

      userEvent.click(breakFastFilterBtn);
      await wait(() => expectFoodCards(breakfastMeals));

      userEvent.click(chickenFilterBtn);
      await wait(() => expectFoodCards(chickenMeals));

      userEvent.click(dessertFilterBtn);
      await wait(() => expectFoodCards(dessertMeals));

      userEvent.click(goatFilterBtn);
      await wait(() => expectFoodCards(goatMeals));

      userEvent.click(allFilterBtn);
      await wait(() => expectFoodCards(meals));
    });
  });

  test('Se ao clicar novamente em um botão de filtro, o filtro é retirado',
    async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mealCategories) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(beefMeals) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

      await act(async () => {
        renderWithRouterAndRedux(<Foods />, {}, '/foods');

        const beefFilterBtn = await screen.findByRole('button', { name: /beef/i });

        userEvent.click(beefFilterBtn);

        await wait(() => expectFoodCards(beefMeals));

        userEvent.click(beefFilterBtn);

        await wait(() => expectFoodCards(meals));
      });
    });
});
