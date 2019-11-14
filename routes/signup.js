const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('./html/signup.html'));
});


router.post('/', async(req, res) => {
    const { email, username, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
        return res.redirect('/signup');
});