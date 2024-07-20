// src/utils/auth.js
import admin from '../config/firebaseAdmin.js';

export const generateToken = async (uid) => {
    try {
        const token = await admin.auth().createCustomToken(uid);
        return token;
    } catch (error) {
        console.error('Error creating custom token:', error);
        throw error;
    }
};
