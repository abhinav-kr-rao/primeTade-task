const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { initDb } = require('./db');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const postRoutes = require('./routes/posts');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize Database
initDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/search', searchRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
