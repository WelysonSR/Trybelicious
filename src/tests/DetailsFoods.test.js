import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// documentação do act: https://pt-br.reactjs.org/docs/testing-recipes.html#act
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import DetailsFoods from '../pages/DetailsFoods';

describe('Testes da página DetailsFood', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  });

  const recipeRoute = '/foods/52771';

  const expectRecomendedDrinks = (apiReturn) => {
    const SIX = 6;
    apiReturn.drinks.forEach((drink, i) => {
      if (i < SIX) {
        expect(screen.getByTestId(`${i}-recomendation-title`)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: drink.strDrink })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: drink.strDrink }))
          .toHaveAttribute('src', drink.strDrinkThumb);
        expect(screen.getByTestId(`${i}-recomendation-card`)).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(`${i}-recomendation-title`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`${i}-recomendation-card`)).not.toBeInTheDocument();
      }
    });
  };

  test('Se é renderizado os detalhes da receita', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneMeal) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinks) });

    renderWithRouterAndRedux(<DetailsFoods />, {}, recipeRoute);

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
    const recipeIng3 = await screen.findByTestId('3-ingredient-name-and-measure');
    expect(recipeIng3).toBeInTheDocument();
    const recipeIng4 = await screen.findByTestId('4-ingredient-name-and-measure');
    expect(recipeIng4).toBeInTheDocument();
    const recipeIng5 = await screen.findByTestId('5-ingredient-name-and-measure');
    expect(recipeIng5).toBeInTheDocument();
    const recipeIng6 = await screen.findByTestId('6-ingredient-name-and-measure');
    expect(recipeIng6).toBeInTheDocument();
    const recipeIng7 = await screen.findByTestId('7-ingredient-name-and-measure');
    expect(recipeIng7).toBeInTheDocument();

    const recipeInstructions = await screen.findAllByTestId('instructions');
    expect(recipeInstructions[0]).toBeInTheDocument();
    expect(recipeInstructions[1]).toBeInTheDocument();

    const recipeVideo = await screen.findByTestId('video');
    expect(recipeVideo).toBeInTheDocument();
  });

  test('Se as bebidas recomendadas são renderizadas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneMeal) });

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinks) });

    renderWithRouterAndRedux(<DetailsFoods />, {}, recipeRoute);

    await wait(() => expectRecomendedDrinks(drinks));
  });

  test('Se ao clicar no botão Start Recipe, redireciona para in-progress',
    async () => {
      await act(async () => {
        jest.spyOn(global, 'fetch')
          .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneMeal) });

        jest.spyOn(global, 'fetch')
          .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinks) });

        const { history } = renderWithRouterAndRedux(<DetailsFoods />, {}, recipeRoute);

        const startRecipeBtn = await screen.findByRole(
          'button', { name: /start recipe/i },
        );
        expect(startRecipeBtn).toBeInTheDocument();

        userEvent.click(startRecipeBtn);

        const { pathname } = history.location;

        await wait(() => {
          expect(pathname).toBe('/foods/52771/in-progress');
        });
      });
    });

  test('Se os botões share e favorite existem e suas funcionalidades', async () => {
    await act(async () => {
      const mockedClipBoard = { writeText: jest.fn() };
      global.navigator.clipboard = mockedClipBoard;

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(oneMeal) });

      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinks) });

      renderWithRouterAndRedux(<DetailsFoods />, {}, recipeRoute);

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
        expect(mockedClipBoard.writeText).toBeCalledWith('http://localhost/foods/52771');
        expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
      });
    });
  });
});
