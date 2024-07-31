// src/middlewares/authMiddleware.js
import { auth as adminAuth } from '../config/firebaseAdmin.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    console.log('Token verified:', decodedToken);
    next();
  } catch (error) {
    console.error('Invalid token', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
