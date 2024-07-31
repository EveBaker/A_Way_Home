// src/controllers/authController.js

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebaseAdmin.js';
import auth from '../config/firebaseClient.js';

export const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  console.log('Register request received:', req.body);

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    console.log('Firebase user created:', firebaseUser);

    await db.collection('users').doc(firebaseUser.uid).set({
      email: firebaseUser.email,
      username,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'User registered successfully', user: { uid: firebaseUser.uid, email: firebaseUser.email, username } });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', req.body);

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User logged in:', user);

    const idToken = await user.getIdToken();

    res.json({ idToken });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(401).json({ error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  const { uid } = req.user;

  console.log('Fetching user details for UID:', uid);

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userDoc.data();
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Error in getUserDetails:', error);
    res.status(500).json({ error: error.message });
  }
};
