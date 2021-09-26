import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';
import { SET_USER } from './store/types';
import { parseJwt } from './utils/helper';

const token = localStorage.getItem('user_rma');
console.log(token);
if (token) {
  const user = parseJwt(token);
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
