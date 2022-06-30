import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// documentação do act: https://pt-br.reactjs.org/docs/testing-recipes.html#act
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import DetailsDrinks from '../pages/DetailsDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

const TEN_SECONDS = 10000;

describe('Testes da página DetailsDrinks', () => {
  jest.setTimeout(TEN_SECONDS);

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  const recipeRoute = '/drinks/178319';

  const expectRecomendedFoods = (apiReturn) => {
    const SIX = 6;
    apiReturn.meals.forEach((meal, i) => {
      if (i < SIX) {
        expect(screen.getByTestId(`${i}-recomendation-title`)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: meal.strMeal })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: meal.strMeal }))
          .toHaveAttribute('src', meal.strMealThumb);
        expect(screen.getByTestId(`${i}-recomendation-card`)).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(`${i}-recomendation-title`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`${i}-recomendation-card`)).not.toBeInTheDocument();
      }
    });
  };

  test('Se é renderizado os detalhes da receita', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(meals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(oneDrink) });

    renderWithRouterAndRedux(<DetailsDrinks />, {}, recipeRoute);

    const thumbNail = await screen.findByTestId('recipe-photo');
    expect(thumbNail).toBeInTheDocument();

    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeIng0 = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(recipeIng0).toBeInTheDocument();
    const recipeIng1 = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(recipeIng1).toBeInTheDocument();
    const recipeIng2 = await screen.findByTestId('2-ingredient-name-and-measure');
    expect(recipeIng2).toBeInTheDocument();

    const recipeInstructions = await screen.findAllByTestId('instructions');
    expect(recipeInstructions[0]).toBeInTheDocument();
    expect(recipeInstructions[1]).toBeInTheDocument();
  });

  test('Se as comidas recomendadas são renderizadas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(meals) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneDrink) });

    renderWithRouterAndRedux(<DetailsDrinks />, {}, recipeRoute);

    await wait(() => expectRecomendedFoods(meals));
  });

  test('Se ao clicar no botão Start Recipe, redireciona para in-progress',
    async () => {
      await act(async () => {
        jest.spyOn(global, 'fetch')
          .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(meals) });

        jest.spyOn(global, 'fetch')
          .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneDrink) });

        const { history } = renderWithRouterAndRedux(<DetailsDrinks />, {}, recipeRoute);

        const startRecipeBtn = await screen.findByRole(
          'button', { name: /start recipe/i },
        );
        expect(startRecipeBtn).toBeInTheDocument();

        userEvent.click(startRecipeBtn);

        const { pathname } = history.location;

        await wait(() => {
          expect(pathname).toBe('/drinks/178319/in-progress');
        });
      });
    });

  test('Se os botões share e favorite existem e suas funcionalidades', async () => {
    await act(async () => {
      const mockedClipBoard = { writeText: jest.fn() };
      global.navigator.clipboard = mockedClipBoard;

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(meals) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneDrink) });

      renderWithRouterAndRedux(<DetailsDrinks />, {}, recipeRoute);

      const favoriteBtn = await screen.findByTestId('favorite-btn');
      const favoriteIcon = await screen.findByAltText('favorite-icon');
      expect(favoriteBtn).toBeInTheDocument();
      expect(favoriteIcon).toHaveAttribute('src', 'whiteHeartIcon.svg');

      userEvent.click(favoriteBtn);

      expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg');

      await wait(() => {
        expect(localStorage).toHaveProperty('favoriteRecipes');
      });

      const shareBtn = await screen.findByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();

      userEvent.click(shareBtn);

      await wait(() => {
        expect(mockedClipBoard.writeText).toHaveBeenCalled();
        expect(mockedClipBoard.writeText).toBeCalledWith('http://localhost/drinks/178319');
        expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
      });
    });
  });
});
