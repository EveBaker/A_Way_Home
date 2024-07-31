// src/config/axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWH_API_URL,
});

console.log(`Base URL: ${process.env.NEXT_PUBLIC_AWH_API_URL}`);

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json'; // Default Content-Type
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
