import { SET_CONNECTED_USER, SET_DISCONNECTED_USER } from '../types.js';

const init = {
  connected: [],
  disconnected: [],
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case SET_CONNECTED_USER: {
      const { users } = action.payload;

      return { ...state, connected: users };
    }
    case SET_DISCONNECTED_USER: {
      const { users } = action.payload;

      return { ...state, disconnected: users };
    }

    default:
      return state;
  }
};

export default userReducer;
