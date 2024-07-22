// src/routes/authRoutes.js
import 'dotenv/config';
import express from 'express';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import admin from '../config/firebaseAdmin.js';
import auth from '../config/firebaseClient.js';
import User from '../models/User.js';
import { generateToken } from '../utils/auth.js';

const router = express.Router();

// Log environment variables (for debugging, remove in production)
console.log('>>>>>>>>>> src/routes/authRoutes.js ----test env vars---- START');
console.log(`FIREBASE_API_KEY: ${process.env.FIREBASE_API_KEY}`);
console.log(`FIREBASE_AUTH_DOMAIN: ${process.env.FIREBASE_AUTH_DOMAIN}`);
console.log(`FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID}`);
console.log('<<<<<<<<<<<<< src/routes/authRoutes.js ----test env vars---- END');

// User registration route
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Create user in MySQL
    const newUser = await User.create({
      firebase_uid: firebaseUser.uid,
      username,
      email,
      password: firebaseUser.uid // Ideally, hash the password before storing it
    });

    // Optionally, add user details to Firestore or Realtime Database
    await admin.firestore().collection('users').doc(firebaseUser.uid).set({
      email: firebaseUser.email,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate a custom token for the user
    const token = await generateToken(user.uid);

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
