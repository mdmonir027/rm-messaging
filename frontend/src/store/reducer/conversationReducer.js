import * as types from '../types';

const init = {
  all: [],
  selected: '',
  messages: [],
};

const conversationReducer = (state = init, action) => {
  switch (action.type) {
    case types.SET_MESSAGE_LOADING: {
      const { loading } = action.payload;
      return {
        ...state,
        loading,
      };
    }
    case types.FETCH_CONVERSATIONS: {
      const { conversations } = action.payload;

      return {
        ...state,
        all: conversations,
        loading: false,
      };
    }
    case types.ADD_NEW_CONVERSATION: {
      const { conversation } = action.payload;

      const all = [...state.all];
      all.unshift(conversation);

      return {
        ...state,
        all,
      };
    }
    case types.FETCH_MESSAGES: {
      const { messages } = action.payload;
      return {
        ...state,
        messages,
      };
    }
    case types.ADD_NEW_MESSAGE: {
      const { message } = action.payload;
      const messages = [...state.messages, message];
      return {
        ...state,
        messages,
      };
    }
    case types.REMOVE_A_MESSAGE: {
      const { messageId } = action.payload;
      const messages = state.messages.filter((m) => m.id !== messageId);
      return {
        ...state,
        messages,
      };
    }

    default:
      return state;
  }
};

export default conversationReducer;
