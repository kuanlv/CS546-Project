const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require("path");

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('html/login.html'));
});

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.redirect('/login');
    }
    try {
        const user = await data.Users.findUserbyUsername(username, password);
        console.log(user);
        req.session.userId = user.id;
        res.redirect('/user');
    } catch(e) {
        return res.redirect('/login');
    }
});

module.exports = router;