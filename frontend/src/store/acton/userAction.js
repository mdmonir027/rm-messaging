import axios from './axios';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const userLogin = async (data, callBack) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, data);
    const token = response?.data?.token;
    localStorage.setItem('user_rma', token);
    callBack({ error: false, token });
  } catch (error) {
    callBack({ error: true, errors: error?.response.data });
  }
};
