// src/middleware/verifyFirebaseToken.js
import admin from '../firebaseAdmin.js';

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
};

export default verifyFirebaseToken;
