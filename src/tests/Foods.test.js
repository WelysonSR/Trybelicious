import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const SEARCH_INPUT_TEST_ID = 'search-input';
const SUBMIT_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';

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

describe('Testes da página Foods', () => {
  test('Se a rota da página é /foods e se o título está correto', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/foods');

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');

    const foodTitle = screen.getByRole('heading', { name: /foods/i });
    expect(foodTitle).toBeInTheDocument();
  });

  test('Se existe um botão de perfil, que redireciona para /profile, e renderiza uma img',
    () => {
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/foods');

      const profileButton = screen.getByRole('img', { name: /profile/i });
      expect(profileButton).toBeInTheDocument();
      expect(profileButton).toHaveAttribute('src', 'profileIcon.svg');

      userEvent.click(profileButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/profile');

      const profileTitle = screen.getByRole('heading', { name: /profile/i });
      expect(profileTitle).toBeInTheDocument();
    });

  test('Se existe um botão de busca no header e se ele renderiza uma img', () => {
    renderWithRouterAndRedux(<App />, initialState, '/foods');

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveAttribute('src', 'searchIcon.svg');
  });

  test('Se a barra de filtros é renderizada ao clicar no botão search', () => {
    renderWithRouterAndRedux(<App />, initialState, '/foods');

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(inputSearch).toBeInTheDocument();

    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadioButton).toBeInTheDocument();

    const nameRadioButton = screen.getByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();

    const firstLetterRadioButton = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
    expect(firstLetterRadioButton).toBeInTheDocument();

    const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
    expect(submitSearchButton).toBeInTheDocument();
  });

  test('Se as receitas são renderizadas ao escolher o filtro "ingredient"', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/foods');

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'chicken');

    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadioButton).toBeInTheDocument();

    userEvent.click(ingredientRadioButton);

    const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
    expect(submitSearchButton).toBeInTheDocument();

    userEvent.click(submitSearchButton);

    await wait(() => {
      expect(screen.getByText(/brown stew chicken/i)).toBeInTheDocument();
      expect(screen.getByText(/chicken & mushroom hotpot/i)).toBeInTheDocument();
      expect(screen.getByText(/chicken alfredo primavera/i)).toBeInTheDocument();
      expect(screen.getByText(/chicken basquaise/i)).toBeInTheDocument();
      expect(screen.getByText(/chicken congee/i)).toBeInTheDocument();
      expect(screen.getByText(/chicken handi/i)).toBeInTheDocument();
      expect(screen.getByText(/kentucky fried chicken/i)).toBeInTheDocument();
      expect(screen.getByText(/kung pao chicken/i)).toBeInTheDocument();
      expect(screen.getByText(/pad see ew/i)).toBeInTheDocument();
      expect(screen.getByText(/piri-piri chicken and slaw/i)).toBeInTheDocument();
      expect(screen.getByText(/thai green curry/i)).toBeInTheDocument();
    });
  });

  test('Se as receitas são renderizadas ao escolher o filtro "First Letter"',
    async () => {
      renderWithRouterAndRedux(<App />, initialState, '/foods');

      const searchButton = screen.getByRole('img', { name: /search/i });
      expect(searchButton).toBeInTheDocument();

      userEvent.click(searchButton);

      const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
      expect(inputSearch).toBeInTheDocument();

      userEvent.type(inputSearch, 'a');

      const firstLetterButton = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
      expect(firstLetterButton).toBeInTheDocument();

      userEvent.click(firstLetterButton);

      const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
      expect(submitSearchButton).toBeInTheDocument();

      userEvent.click(submitSearchButton);

      await wait(() => {
        expect(screen.getByText(/apple frangipan tart/i)).toBeInTheDocument();
        expect(screen.getByText(/apple & blackberry crumble/i)).toBeInTheDocument();
        expect(screen.getByText(/apam balik/i)).toBeInTheDocument();
        expect(screen.getByText(/ayam percik/i)).toBeInTheDocument();
      });
    });

  test('Se é exibido um alerta quando não é encontrada uma receita', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/foods');

    global.alert = jest.fn();

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'arroz');

    const nameRadioButton = screen.getByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();

    userEvent.click(nameRadioButton);

    const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
    expect(submitSearchButton).toBeInTheDocument();

    userEvent.click(submitSearchButton);

    await wait(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  test('Se existe um botão de drinks, que redireciona para /drinks, e renderiza uma img',
    () => {
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/foods');

      const drinksButton = screen.getByRole('img', { name: /drink/i });
      expect(drinksButton).toBeInTheDocument();
      expect(drinksButton).toHaveAttribute('src', 'drinkIcon.svg');

      userEvent.click(drinksButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');

      const drinksTitle = screen.getByRole('heading', { name: /drinks/i });
      expect(drinksTitle).toBeInTheDocument();
    });

  test(
    'Se existe um botão de explore, que redireciona para /explore, e renderiza uma img',
    () => {
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/foods');

      const exploreButton = screen.getByRole('img', { name: /explore/i });
      expect(exploreButton).toBeInTheDocument();
      expect(exploreButton).toHaveAttribute('src', 'exploreIcon.svg');

      userEvent.click(exploreButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/explore');

      const exploreTitle = screen.getByRole('heading', { name: /explore/i });
      expect(exploreTitle).toBeInTheDocument();
    },
  );

  test('Se existe um botão de foods, que redireciona para /foods, e renderiza uma img',
    () => {
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/foods');

      const foodsButton = screen.getByRole('img', { name: /meal/i });
      expect(foodsButton).toBeInTheDocument();
      expect(foodsButton).toHaveAttribute('src', 'mealIcon.svg');

      userEvent.click(foodsButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/foods');

      const foodsTitle = screen.getByRole('heading', { name: /foods/i });
      expect(foodsTitle).toBeInTheDocument();
    });
});
