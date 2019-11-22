const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const userData = require('../data');

router.get('/', middleware.redirectLogin, async(req, res) => {
    console.log("get date");
    const users = await userData.Users.getAllusers();
    res.render('date', {users});
});
module.exports = router;