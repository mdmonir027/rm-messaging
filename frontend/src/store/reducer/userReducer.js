import * as types from '../types.js';

const init = {
  connected: [],
  disconnected: [],
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case types.SET_CONNECTED_USER: {
      const { users } = action.payload;

      return { ...state, connected: users };
    }
    case types.SET_DISCONNECTED_USER: {
      const { users } = action.payload;

      return { ...state, disconnected: users };
    }
    case types.CONNECT_NEW_USER: {
      const { user } = action.payload;

      const updatedUser = [...state.connected, user];

      return { ...state, connected: updatedUser };
    }
    case types.DISCONNECT_A_USER: {
      const { username } = action.payload;

      const updatedUser = state.connected.filter(
        (u) => u.username !== username
      );

      return { ...state, connected: updatedUser };
    }

    default:
      return state;
  }
};

export default userReducer;
