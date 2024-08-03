// src/scripts/loginUser.ts
import 'dotenv/config';
import { auth } from '../config/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    // Sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // Send ID token to the backend to exchange for a custom token
    const response = await axios.post('http://localhost:5000/login', { idToken });
    const { token } = response.data;

    // Store the custom token in localStorage
    localStorage.setItem('authToken', token);

    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

loginUser('noob@email.com', 'noob101');
