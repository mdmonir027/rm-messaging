import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';
import { SET_USER } from './store/types';
import { parseJwt } from './utils/helper';
import setAuthToken from './utils/setAuthToken';

const token = localStorage.getItem('user_rma');

if (token) {
  const user = parseJwt(token);
  setAuthToken(token);
  store.dispatch({ type: SET_USER, payload: { user } });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
