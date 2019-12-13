const express = require('express');
const router = express.Router();
const userData = require('../data').Users;
const path = require("path");
const middleware = require('../middleware/middleware');

router.get('/', middleware.redirectDate, async(req, res) => {
    // res.sendFile(path.resolve('html/login.html'));
    res.render('login', {
        title: "Login"
    });
});

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('login', {
            error: "Please enter username and password !",
            title: "Login"
        });
    }
    try {
        const user = await userData.findUserbyUsername(username);
        await userData.isPasswordCorrect(username, password);
        req.session.userId = user._id;
        res.redirect('date');
    } catch(e) {
        return res.redirect('/login');
    }
});

module.exports = router;