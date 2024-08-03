// src/api/auth.js
import 'dotenv/config';
import api from '../config/axiosConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseClient';

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
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const idToken = await userCredential.user.getIdToken();

    const response = await api.post(`${API_URL}/api/auth/login`, {
      idToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
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
