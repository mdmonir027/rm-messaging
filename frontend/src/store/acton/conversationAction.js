import axios from './axios';
import * as types from '../types';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchAllConversations = () => async (dispatch) => {
  dispatch({ type: types.SET_MESSAGE_LOADING, payload: { loading: true } });
  try {
    const response = await axios.get(`${baseUrl}/conversation/all`);
    const conversations = response.data;

    console.log({ conversations });

    dispatch({
      type: types.FETCH_CONVERSATIONS,
      payload: {
        conversations,
      },
    });
    dispatch({ type: types.SET_MESSAGE_LOADING, payload: { loading: false } });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.SET_MESSAGE_LOADING, payload: { loading: false } });
  }
};
export const addConversation =
  (userId, modalSetFunction) => async (dispatch) => {
    console.log({ userId });
    dispatch({ type: types.SET_MESSAGE_LOADING, payload: { loading: true } });
    try {
      const response = await axios.get(`${baseUrl}/conversation/add/${userId}`);
      const conversation = response.data;

      modalSetFunction(false);

      dispatch({
        type: types.ADD_NEW_CONVERSATION,
        payload: {
          conversation,
        },
      });
      dispatch({
        type: types.SET_SELECTED_USER,
        payload: {
          userId: conversation._id,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.SET_MESSAGE_LOADING,
        payload: { loading: false },
      });
    }
  };

export const setSelectConversation = (userId) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTED_USER,
    payload: {
      userId,
    },
  });
};
