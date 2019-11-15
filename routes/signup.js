const express = require('express');
const router = express.Router();
const path = require("path");
const data = require('../data');

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('./html/signup.html'));
});


router.post('/', async(req, res) => {
    const newUser = {
        email, username, password, confirmPassword 
    } = req.body;
    if (!email || !username || !password || !confirmPassword)
        return res.redirect('/signup');
    if (password !== confirmPassword)
        return res.redirect('/signup');
    try {
        console.log("bb")
        await data.Users.addUser(newUser);
        res.redirect('/login');
    }catch(e) {
        res.redirect('/signup');
    }
});

module.exports = router;