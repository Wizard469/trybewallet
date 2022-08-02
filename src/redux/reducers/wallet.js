// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURR } from '../actions/actionTypes';

const initialState = { currencies: [] };

const saveCurrencies = (state = initialState, action) => {
  const { currencies } = action;

  switch (action.type) {
  case FETCH_CURR:
    return {
      ...state,
      currencies,
    };
  default:
    return state;
  }
};

export default saveCurrencies;
