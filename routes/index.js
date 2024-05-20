const express = require('express');
const path = require('path');
const router = express.Router();

// Serve a simple upload form
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Serve the success page
router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));
});

module.exports = router;
