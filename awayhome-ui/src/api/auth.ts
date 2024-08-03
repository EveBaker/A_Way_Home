// src/api/auth.js
import api from '../config/axiosConfig';

// API URL
const API_URL = process.env.NEXT_PUBLIC_AWH_API_URL;

// register user
export const registerUser = async (username, email, password) => {
  const response = await api.post(`${API_URL}/api/auth/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// login user
export const loginUser = async (email, password) => {
  const response = await api.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// Fetch User Details
export const getUserDetails = async (idToken) => {
  const response = await api.get(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data;
};
