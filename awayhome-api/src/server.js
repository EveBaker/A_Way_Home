// src/server.js
import 'dotenv/config';
import express from 'express';
import sequelize from './utils/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
// import flyerRoutes from './routes/flyerRoutes.js';
// import organizationRoutes from './routes/organizationRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
// app.use('/api/flyers', flyerRoutes);
// app.use('/api/organizations', organizationRoutes);

const PORT = process.env.API_PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
