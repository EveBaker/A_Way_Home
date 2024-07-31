// src/server.js
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { authenticate } from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
// import animalRoutes from './routes/animalRoutes.js';

// Log environment variables (for debugging, remove in production)
console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY);
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN);
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);

// Initialize Express app
const app = express();

app.use(cors({
  origin: 'http://localhost:3000/', // Adjust this as needed for your frontend's address
}));

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
// app.use('/api/animals', animalRoutes);

app.get('/test', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.API_PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`AWH-API Server running on port ${PORT}`);
});
