// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURR_CODE, ADD_EXPENSES, REMOVE_EXPENSES, EDIT_EXPENSES, UPDATE_EXPENSES,
} from '../actions/actionTypes';

const initialState = {
  currencies: [],
  expenses: [],
  expensesCounter: 0,
  idToEdit: 0,
  editor: false,
};

const saveCurrencies = (state = initialState, action) => {
  const { currencies, expense, data, type, id, expenses } = action;
  const { expensesCounter } = state;

  switch (type) {
  case FETCH_CURR_CODE:
    return {
      ...state,
      currencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: expensesCounter,
          ...expense,
          exchangeRates: data,
        },
      ],
      expensesCounter: expensesCounter + 1,
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
      ].filter((ex) => ex.id !== id),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      idToEdit: id,
      editor: true,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...expenses],
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default saveCurrencies;
