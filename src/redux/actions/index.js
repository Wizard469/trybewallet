import { USER_LOGIN } from './actionTypes';

export const setUserEmail = (email) => ({
  type: USER_LOGIN,
  email,
});

export const anything = (aim) => ({
  type: 'USER',
  aim,
});
