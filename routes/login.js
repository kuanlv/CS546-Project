const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('html/login.html'));
});

module.exports = router;