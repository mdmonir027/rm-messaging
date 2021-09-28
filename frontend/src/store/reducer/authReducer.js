import { SET_USER, SET_USER_LOGIN_ERRORS } from '../types.js';

const init = {
  isLogin: false,
  user: {},
  error: '',
  errors: {},
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;

      return {
        isLogin: Object.keys(user).length !== 0,
        user,
      };
    }
    case SET_USER_LOGIN_ERRORS: {
      const { error, errors } = action.payload;

      return {
        ...state,
        error,
        errors,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
