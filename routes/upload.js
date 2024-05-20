const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Create the data folder if it doesn't exist
const uploadFolder = path.join(__dirname, '..', 'data');
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

// Handle file uploads
router.post('/upload', (req, res, next) => {
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

module.exports = router;
