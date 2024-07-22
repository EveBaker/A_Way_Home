// src/controllers/authController.js
import { getAuth } from 'firebase-admin/auth';
import { findOne, create } from '../models/User';
import admin from '../config/firebaseAdmin.js';

const registerOrLoginUser = async (req, res) => {
    const { firebaseToken } = req.body;

    try {
        const decodedToken = await getAuth().verifyIdToken(firebaseToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;

        // Check if user exists in MySQL database
        let user = await findOne({ where: { firebase_uid: uid } });

        // If not, create a new user
        if (!user) {
            user = await create({ firebase_uid: uid, email });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

export default { registerOrLoginUser };
