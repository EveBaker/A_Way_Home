// src/config/firebaseAdmin.js
import admin from 'firebase-admin';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// This will test that all local environment variables are set correctly
// and that the Firebase Admin SDK is initialized correctly
// comment out or delete for production
console.log('>>>>>>>>>src/config/firebaseAdmin.js ----test env vars---- START')
console.log(`FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID.replace(/\\n/g, '\n')}`);
console.log(`FIREBASE_PRIVATE_KEY: ${process.env.FIREBASE_PRIVATE_KEY}`);
console.log(`FIREBASE_CLIENT_EMAIL: ${process.env.FIREBASE_CLIENT_EMAIL}`);
console.log('<<<<<<<<<<<<<< src/config/firebaseAdmin.js ----test env vars---- END')

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.envFIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

export default admin;
