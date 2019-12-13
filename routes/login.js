const express = require('express');
const router = express.Router();
const userData = require('../data').Users;
const path = require("path");
const middleware = require('../middleware/middleware');

router.get('/', middleware.redirectDate, async(req, res) => {
    // res.sendFile(path.resolve('html/login.html'));
    res.render('login', {
        error: '',
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
        if (!user) {
            return res.render('login', {
                error: "Incorrect username and password combo",
                title: "error"
            })
        }
        const isCorrect = await userData.isPasswordCorrect(username, password);
        if (isCorrect) {
            req.session.userId = user._id;
            res.redirect('date');
        } else {
            res.render('login', {
                error: "Incorrect username and password combo",
                title: "error"
            })
        }
    } catch(e) {
        return res.render('login', {
            error: e,
            title: "catch"
        })
    }
});

module.exports = router;