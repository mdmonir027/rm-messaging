import axios from './axios';
import * as types from '../types';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchAllMessage = (conversationId) => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/message/${conversationId}`);

    const messages = response.data;

    console.log({ messages });
    dispatch({
      type: types.FETCH_MESSAGES,
      payload: { messages },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMessage = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/message`, data);

    const message = response.data;
    console.log({ message });
    dispatch({
      type: types.ADD_NEW_MESSAGE,
      payload: {
        message,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
