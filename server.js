const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

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

// Handle file uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).send('File size exceeds 20MB limit');
            }
            return res.status(500).send('An error occurred during the file upload');
        }
        res.status(200).send('File uploaded successfully');
    });
});

// Serve a simple upload form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
