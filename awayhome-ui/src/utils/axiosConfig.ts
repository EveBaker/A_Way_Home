// src/utils/axiosConfig.ts
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWH_API_URL, // Ensure this matches your .env variable name
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

// API functions
export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export default api;
