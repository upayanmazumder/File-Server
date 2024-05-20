const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from .env file or default to 3000

// Create a stream for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' });

// Configure morgan for request logging
app.use(morgan('combined', { stream: accessLogStream }));

// Serve static files from the public directory
app.use(express.static('public'));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Import routes
const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');

// Use routes
app.use('/', indexRouter);
app.use('/', uploadRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
