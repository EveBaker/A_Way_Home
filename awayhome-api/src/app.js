// src/index.js
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AWH-API Server running on port ${PORT}`);
});
