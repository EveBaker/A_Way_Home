// src/api/auth.js
import api from '../config/axiosConfig';

// register user
export const registerUser = async (username, email, password) => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

// login user
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

// Fetch User Details
export const getUserDetails = async (idToken) => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data;
};
