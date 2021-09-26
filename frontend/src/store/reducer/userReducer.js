import { SET_USER } from '../types.js';

const init = {
  isLogin: false,
  user: {},
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action.payload;

      return {
        isLogin: Object.keys(user).length !== 0,
        user,
      };

    default:
      return state;
  }
};

export default userReducer;
