const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const userData = require('../data');

router.get('/', middleware.redirectLogin, async(req, res) => {
    console.log("get date");
    const profiles = await userData.Users.getAllProfile();
    res.render('date', {profiles});
});

module.exports = router;