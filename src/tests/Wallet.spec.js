import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testing requirement one', () => {
  it('test if user email & total amount is shown on the screen', () => {
    renderWithRouterAndRedux(<Wallet />,
      {
        initialState: { user: { email: 'test@example.com'} }
      });

    expect(screen.getByTestId("email-field")).toHaveTextContent('test@example.com');
    expect(screen.getByTestId("total-field")).toHaveTextContent('0.00');
  });

  it('tests the buttons add, edit and delete', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const response = Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true,
    });

    const mockedData = jest.spyOn(global, "fetch").mockImplementation(() => response);

    userEvent.click(screen.getByTestId("value-input"));
    userEvent.type(screen.getByTestId("value-input"), '350');
    userEvent.selectOptions(screen.getByTestId("currency-input"), 'CAD');
    userEvent.selectOptions(screen.getByTestId("method-input"), 'Cartão de débito');
    userEvent.selectOptions(screen.getByTestId("tag-input"), 'Lazer');
    userEvent.type(screen.getByTestId("description-input"), 'God of War Ragnarok');
    userEvent.click(screen.getByRole("button", { name: /adicionar despesa/i }));

    await waitFor(() => expect(mockedData).toHaveBeenCalledTimes(1));

    userEvent.click(screen.getByTestId("edit-btn"));
    userEvent.type(screen.getByTestId("value-input"), '70');
    userEvent.selectOptions(screen.getByTestId("currency-input"), 'USD');
    userEvent.selectOptions(screen.getByTestId("method-input"), 'Cartão de débito');
    userEvent.selectOptions(screen.getByTestId("tag-input"), 'Lazer');
    userEvent.type(screen.getByTestId("description-input"), 'God of War Ragnarok');
    userEvent.click(screen.getByRole("button", { name: /editar despesa/i }));

    userEvent.click(screen.getByTestId("delete-btn"));
  });
});
