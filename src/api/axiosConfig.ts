import axios, { AxiosInstance } from 'axios';
import { server_url } from '../constant/environment';

const token:any = localStorage.getItem('access_token');
const apiBaseURL = server_url;

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Authorization: `Bearer ${JSON.parse(token)}`,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
