const express = require('express');
const router = express.Router();
const path = require("path");
const Users = require('../data');

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('./html/signup.html'));
});


router.post('/', async(req, res) => {
    const newUser = {
        email, username, password, confirmPassword 
    } = req.body;
    if (password !== confirmPassword)
        return res.redirect('/signup');
    try {
        await Users.addUser(newUser);
    }catch(e) {
        res.redirect('/signup');
    }
});

module.exports = router;