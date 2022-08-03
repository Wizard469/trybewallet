// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURR_CODE, ADD_EXPENSES } from '../actions/actionTypes';

const initialState = {
  currencies: [],
  expenses: [],
  expensesCounter: 0,
};

const saveCurrencies = (state = initialState, action) => {
  const { currencies, expense, data } = action;
  const { expensesCounter, expenses } = state;

  switch (action.type) {
  case FETCH_CURR_CODE:
    return {
      ...state,
      currencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...expenses,
        {
          id: expensesCounter,
          ...expense,
          exchangeRates: data,
        },
      ],
      expensesCounter: expensesCounter + 1,
    };
  default:
    return state;
  }
};

export default saveCurrencies;
