const express = require('express');
const router = express.Router();

// Define client-specific routes
router.get('/client-resource', (req, res) => {
    if (req.client) {
        res.json({ message: 'This is a client-specific resource' });
    } else {
        res.status(403).json({ message: 'Access forbidden' });
    }
});

module.exports = router;
