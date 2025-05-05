import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://44.207.10.254',
  headers: {
    'Content-Type': 'application/json',
  },
});
