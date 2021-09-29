import axios from './axios';
import * as types from '../types';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchAllMessage = (receiverId) => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/message/${receiverId}`);

    const messages = response.data();

    console.log({ messages });
    dispatch({
      type: types.FETCH_MESSAGES,
      payload: { messages },
    });
  } catch (error) {
    console.log(error?.response?.message);
  }
};
