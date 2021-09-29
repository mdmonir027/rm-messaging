import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import conversationReducer from './conversationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  conversation: conversationReducer,
});

export default rootReducer;
