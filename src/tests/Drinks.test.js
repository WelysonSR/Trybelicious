import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const SEARCH_INPUT_TEST_ID = 'search-input';
const SUBMIT_SEARCH_BUTTON_TEST_ID = 'exec-search-btn';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';
const NAME_SEARCH_RADIO_TEST_ID = 'name-search-radio';

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

const TRINTA_MS = 30000;

describe('Testes da página Drinks', () => {
  jest.setTimeout(TRINTA_MS);
  test('Se a rota da página é /drinks e se o título está correto', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/drinks');

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const foodTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(foodTitle).toBeInTheDocument();
  });

  test('Se existe um botão de perfil, que redireciona para /profile, e renderiza uma img',
    () => {
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/drinks');

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
    renderWithRouterAndRedux(<App />, initialState, '/drinks');

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveAttribute('src', 'searchIcon.svg');
  });

  test('Se a barra de filtros é renderizada ao clicar no botão search', () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(inputSearch).toBeInTheDocument();

    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadioButton).toBeInTheDocument();

    const nameRadioButton = screen.getByTestId(NAME_SEARCH_RADIO_TEST_ID);
    expect(nameRadioButton).toBeInTheDocument();

    const firstLetterRadioButton = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
    expect(firstLetterRadioButton).toBeInTheDocument();

    const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
    expect(submitSearchButton).toBeInTheDocument();
  });

  test('Se as receitas são renderizadas ao escolher o filtro "ingredient"', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'gin');

    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadioButton).toBeInTheDocument();

    userEvent.click(ingredientRadioButton);

    const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
    expect(submitSearchButton).toBeInTheDocument();

    userEvent.click(submitSearchButton);

    await wait(() => {
      expect(screen.getByText(/3-mile long island iced tea/i)).toBeInTheDocument();
      expect(screen.getByText(/69 special/i)).toBeInTheDocument();
      expect(screen.getByText(/a1/i)).toBeInTheDocument();
      expect(screen.getByText(/abbey cocktail/i)).toBeInTheDocument();
      expect(screen.getByText(/abbey martini/i)).toBeInTheDocument();
      expect(screen.getAllByText(/ace/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/adam & eve/i)).toBeInTheDocument();
      expect(screen.getByText(/addison/i)).toBeInTheDocument();
      expect(screen.getByText(/alaska cocktail/i)).toBeInTheDocument();
      expect(screen.getByText(/alexander/i)).toBeInTheDocument();
      expect(screen.getByText(/angel face/i)).toBeInTheDocument();
    });
  });

  // test('Se o resultado do filtro for 1 receita, redireciona para detalhes dessa receita',
  //   () => {
  //     const { history } = renderWithRouterAndRedux(<App />, initialState, '/drinks');

  //     const searchButton = screen.getByRole('img', { name: /search/i });
  //     expect(searchButton).toBeInTheDocument();

  //     userEvent.click(searchButton);

  //     const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
  //     expect(inputSearch).toBeInTheDocument();
  //     userEvent.type(inputSearch, 'Quentin');

  //     const nameRadioButton = screen.getByTestId(NAME_SEARCH_RADIO_TEST_ID);
  //     expect(nameRadioButton).toBeInTheDocument();

  //     userEvent.click(nameRadioButton);

  //     const submitSearchButton = screen.getByTestId(SUBMIT_SEARCH_BUTTON_TEST_ID);
  //     expect(submitSearchButton).toBeInTheDocument();

  //     userEvent.click(submitSearchButton);

  //     const { pathname } = history.location;
  //     expect(pathname).toBe('/drinks/11993');
  //   });

  test('Se é exibido um alerta quando não é encontrada uma receita', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/drinks');

    global.alert = jest.fn();

    const searchButton = screen.getByRole('img', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'arroz');

    const nameRadioButton = screen.getByTestId(NAME_SEARCH_RADIO_TEST_ID);
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
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/drinks');

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
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/drinks');

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
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/drinks');

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