import axios from 'axios';
import { parseJwt } from '../../utils/helper';

import * as types from '../types';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const userLogin = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, data);
    const token = response?.data?.token;
    localStorage.setItem('user_rma', token);
    dispatch({
      type: types.SET_USER,
      payload: {
        user: parseJwt(token),
      },
    });

    history.puss('/inbox');
  } catch (error) {
    dispatch({
      type: types.SET_USER_LOGIN_ERRORS,
      payload: {
        error: 'login',
        errors: error?.response?.data,
      },
    });
  }
};

export const fetchDisconnectedUser = () => async (dispatch) => {
  try {
    const users = await axios.get(`${baseUrl}/user?type=d`);
    dispatch({ type: types.SET_DISCONNECTED_USER, payload: { users } });
    console.log({ users });
  } catch (error) {
    console.log(error.response);
  }
};
