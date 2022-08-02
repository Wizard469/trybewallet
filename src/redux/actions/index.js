import { USER_LOGIN, FETCH_CURR } from './actionTypes';

const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';
const USDT = 'USDT';

export const setUserEmail = (email) => ({
  type: USER_LOGIN,
  email,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(CURRENCIES_URL);
  const data = await response.json();
  const currencies = Object.keys(data).filter((key) => key !== USDT);
  dispatch({ type: FETCH_CURR, currencies });
};
