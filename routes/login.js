const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require("path");

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('html/login.html'));
});

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    if (username && password){
        const user = users.find(
            user => username === user.username && user.password === password
            );
        if (user) {
            req.session.userId = user.id;
            return res.redirect('/user');
        }
    }
    return res.redirect('/login');
})

module.exports = router;