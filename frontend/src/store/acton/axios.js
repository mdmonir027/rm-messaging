import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

const token = localStorage.getItem('user_rma');

axiosInstance.defaults.headers.common['Authorization'] = token ? token : '';

export default axiosInstance;
