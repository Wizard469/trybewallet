// Esse reducer será responsável por tratar as informações do usuário
import { USER_LOGIN } from '../actions/actionTypes';

const initialState = {};

const setEmail = (state = initialState, action) => {
  const { email } = action;

  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default setEmail;
