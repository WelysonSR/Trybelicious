import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import NotFound from '../pages/NotFound';

describe('testes da página NotFound', () => {
  test('se a página not found é renderizada', () => {
    renderWithRouterAndRedux(<NotFound />, {}, '/*');
    const title = screen.getByText('Not Found');
    expect(title).toBeInTheDocument();
  });
});
