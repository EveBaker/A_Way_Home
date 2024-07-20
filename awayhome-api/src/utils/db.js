// src/utils/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.AWH_MYSQL_DATABASE,
    process.env.AWH_MYSQL_USER,
    process.env.AWH_MYSQL_PASSWORD,
    {
        host: process.env.AWH_MYSQL_HOST || 'localhost',
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
