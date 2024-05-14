const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from .env file or default to 3000

// Create a stream for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' });

// Configure morgan for request logging
app.use(morgan('combined', { stream: accessLogStream }));

// Create the data folder if it doesn't exist
const uploadFolder = path.join(__dirname, 'data');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB file size limit
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
}).single('file');

app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Handle file uploads
app.post('/upload', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                console.error('File size exceeds 20MB limit');
                return res.status(413).send('File size exceeds 20MB limit');
            }
            console.error('An error occurred during the file upload:', err.message);
            return res.status(500).send('An error occurred during the file upload');
        }
        console.log('File uploaded successfully:', req.file.filename);
        res.redirect('/success');
    });
});

// Serve the success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Serve a simple upload form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
