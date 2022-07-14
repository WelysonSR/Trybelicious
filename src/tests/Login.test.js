import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da página Login', () => {
  test('Se os inputs de email e senha e o botão estão sendo renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', { name: 'ENTER' });

    expect(enterButton).toBeDisabled();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'abcdefgh');

    expect(emailInput).toHaveValue('email@email.com');
    expect(passwordInput).toHaveValue('abcdefgh');
    expect(enterButton).toBeEnabled();

    userEvent.click(enterButton);

    const title = screen.getByRole('heading', { name: 'Foods' });
    expect(title).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
