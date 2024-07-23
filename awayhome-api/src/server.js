// src/server.js
import 'dotenv/config';
import express from 'express';
import sequelize from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
// import flyerRoutes from './routes/flyerRoutes.js';
// import animalRoutes from './routes/animalRoutes.js';



// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);



const PORT = process.env.API_PORT || 5000;

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`AWH-API Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
