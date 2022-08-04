import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testing requirement one', () => {
  it('test if user email & total amount is shown on the screen', () => {
    renderWithRouterAndRedux(<Wallet />,
      {
        initialState: { user: { email: 'test@example.com'} }
      });

    expect(screen.getByTestId("email-field")).toHaveTextContent('test@example.com');
    expect(screen.getByTestId("total-field")).toHaveTextContent('0.00');
  });
});