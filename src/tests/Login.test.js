import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da página de Login', () => {
  test('Se os inputs de email e senha e o botão estão sendo renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputs = screen.getAllByRole('textbox');
    const enterButton = screen.getByRole('button', { name: 'Enter' });

    expect(enterButton).toBeDisabled();
    expect(inputs[0]).toBeinTheDocument();
    expect(inputs[1]).toBeinTheDocument();

    userEvent.type(inputs[0], 'email@email.com');
    userEvent.type(inputs[1], '123456');

    expect(inputs[0]).toHaveValue('email@email.com');
    expect(inputs[1]).toHaveValue('123456');
    expect(enterButton).toBeEnabled();

    userEvent.click(enterButton);

    const title = screen.getByRole('heading', { name: /foods/i });
    expect(title).toBeinTheDocument();

    const { location } = history;
    expect(location.pathname).toBe('/foods');
  });
});
