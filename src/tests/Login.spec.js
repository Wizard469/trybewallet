import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const INVALID_EMAIL = 'joãoPedro,com';
const INVALID_PASSWORD = '12345';
const VALID_EMAIL = 'joao@Pedro.com';
const VALID_PASSWORD = '123456';

describe('Testing requirement one', () => {
  it('has the route "/"', () => {
    const { history: { location: { pathname }} } = renderWithRouterAndRedux(<App />);

    expect(pathname).toBe('/');
  });

  it('should have an email and password input and be valid', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveAttribute('disabled');

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveAttribute('disabled');

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveAttribute('disabled');

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(screen.getByRole('button', { name: /entrar/i })).not.toHaveAttribute('disabled');
  });

  it('saves the email at the global state when the user logs in', () => {
    const updatedState = {
      user: {
        email: "joao@Pedro.com",
      },
      wallet: {
        currencies: [],
        expenses: [],
        expensesCounter: 0,
     },
    }

    const { store: { getState } } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(getState()).toEqual(updatedState);
  });

  it('the route should change to "/carteira", after the button "Entrar" is clicked', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(history.location.pathname).toBe('/carteira');
  });
});
