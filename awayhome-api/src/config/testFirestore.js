// testFirestore.js is a standalone script that tests the connection to Firestore. It uses the Firebase Admin SDK to connect to Firestore and create a test document with a test field and value. This script is useful for testing the Firestore connection and ensuring that the environment variables are correctly set up.
// testFirestore.js is a standalone script that tests the connection to Firestore. It uses the Firebase Admin SDK to connect to Firestore and create a test document with a test field and value. This script is useful for testing the Firestore connection and ensuring that the environment variables are correctly set up.
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load environment variables from .env file
dotenv.config({ path: '../../.env' });

console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);

// Ensure all required environment variables are present
if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_PRIVATE_KEY_ID ||
    !process.env.FIREBASE_PRIVATE_KEY ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_CLIENT_ID ||
    !process.env.FIREBASE_AUTH_URI ||
    !process.env.FIREBASE_TOKEN_URI ||
    !process.env.FIREBASE_AUTH_PROVIDER_CERT_URL ||
    !process.env.FIREBASE_CLIENT_CERT_URL
) {
    console.error('Missing one or more environment variables');
    process.exit(1);
}

// Initialize Firebase Admin SDK
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
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

// Debugging: Print service account to ensure it's correctly set
console.log('Service Account:', serviceAccount);

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

// Function to test Firestore
const testFirestore = async () => {
    try {
        // Create a document reference
        const docRef = db.collection('testCollection').doc('testDocument');

        // Set the document with a test field and value
        await docRef.set({
            testField: 'testValue',
        });

        console.log('Success: Document created and field set');
    } catch (error) {
        console.error('Fail: Error creating document or setting field', error);
    }
};

// Run the test
testFirestore();
