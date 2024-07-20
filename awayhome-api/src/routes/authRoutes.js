// src/routes/authRoutes.js
import 'dotenv/config';
import express from 'express';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import admin from '../config/firebaseAdmin.js'; // Import initialized Firebase Admin SDK
import { generateToken } from '../utils/auth.js'; // Utility function for token generation


const router = express.Router();
// This will test that all local environment variables are set correctly
// and that the Firebase Admin SDK is initialized correctly
// comment out or delete for production
console.log('>>>>>>>>>> src/routes/authRoutes.js ----test env vars---- START')
console.log(`FIREBASE_API_KEY: ${process.env.FIREBASE_API_KEY}`);
console.log(`FIREBASE_AUTH_DOMAIN: ${process.env.FIREBASE_AUTH_DOMAIN}`);
console.log(`FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID}`);
console.log('<<<<<<<<<<<<< src/routes/authRoutes.js ----test env vars---- END')

// Initialize Firebase Client SDK
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// User registration route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Optionally, you can add user details to Firestore or Realtime Database
        await admin.firestore().collection('users').doc(user.uid).set({
            email: user.email,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({ message: 'User registered successfully' });
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
