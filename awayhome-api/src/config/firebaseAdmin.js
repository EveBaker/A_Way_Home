// src/config/firebaseAdmin.js
import dotenv from 'dotenv';
import 'dotenv/config'
import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// Load environment variables from .env file
dotenv.config({ path: '../../.env' });

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

try {
    initializeApp({
        credential: cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
    console.log('Firebase Admin SDK initialized');
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1);
}

const db = getFirestore();
console.log('Firestore initialized');
const auth = admin.auth();

export { db, auth };
