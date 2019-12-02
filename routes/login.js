const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require("path");
const middleware = require('../middleware/middleware');

router.get('/', middleware.redirectDate, async(req, res) => {
    res.sendFile(path.resolve('html/login.html'));
});

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.redirect('/login');
    }
    try {
        console.log(req.body);
        const user = await data.Users.findUserbyUsername(username);
        console.log(user);
        await data.Users.isPasswordCorrect(username, password);
        req.session.userId = user._id;
        res.redirect('date');
    } catch(e) {
        return res.redirect('/login');
    }
});

module.exports = router;