// src/controllers/authController.js

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db, auth } from '../config/firebaseAdmin.js';  // Correct import for admin Firestore
// import auth from '../config/firebaseClient.js';   // Client-side auth

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Register request received:', req.body);

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if username already exists
    const usernameQuerySnapshot = await db.collection('users').where('username', '==', username).get();
    if (!usernameQuerySnapshot.empty) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('Firebase user created:', user);

    // Set the display name
    await updateProfile(user, { displayName: username });

    // Save user information to Firestore
    const userRef = db.collection('users').doc(user.uid);  // Correct usage of Firestore Admin SDK
    await userRef.set({
      username: username,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { uid: user.uid, email: user.email, username }
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { idToken } = req.body;

  console.log('Login request received:', req.body);

  if (!idToken) {
    return res.status(400).json({ error: 'Missing ID token' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const user = await auth.getUser(uid);

    // Generate a custom token
    const customToken = await auth.createCustomToken(uid);

    console.log('User logged in:', user);

    res.json({ token: customToken });
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
    if (!userDoc.exists()) {
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
