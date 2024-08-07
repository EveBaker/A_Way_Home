// src/controllers/authController.js
import { getAuth } from 'firebase-admin/auth';
import { admin, db, auth } from '../config/firebaseAdmin.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const usernameQuerySnapshot = await db.collection('users').where('username', '==', username).get();
    if (!usernameQuerySnapshot.empty) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    const userRef = db.collection('users').doc(userRecord.uid);
    await userRef.set({
      username,
      email: userRecord.email,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { uid: userRecord.uid, email: userRecord.email, username }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Missing ID token' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const customToken = await auth.createCustomToken(uid);

    res.json({ token: customToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  const { uid } = req.user;

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userDoc.data();
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
