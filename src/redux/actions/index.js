import {
  USER_LOGIN, FETCH_CURR_CODE, ADD_EXPENSES,
  REMOVE_EXPENSES, EDIT_EXPENSES, UPDATE_EXPENSES,
} from './actionTypes';

const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';
const USDT = 'USDT';

export const setUserEmail = (email) => ({
  type: USER_LOGIN,
  email,
});

export const fetchCurrenciesCode = () => async (dispatch) => {
  const response = await fetch(CURRENCIES_URL);
  const data = await response.json();
  const currencies = Object.keys(data).filter((key) => key !== USDT);
  dispatch({ type: FETCH_CURR_CODE, currencies });
};

export const addExpenses = (expense) => async (dispatch) => {
  const response = await fetch(CURRENCIES_URL);
  const data = await response.json();
  dispatch({ type: ADD_EXPENSES, expense, data });
};

export const removeExpenses = (id) => ({
  type: REMOVE_EXPENSES,
  id,
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  id,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});
