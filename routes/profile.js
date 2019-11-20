const express = require("express");
const router = express.Router();
const middleware = require('../middleware/middleware');

router.get('/', middleware.redirectLogin, async(req, res) => {
    res.render('profile');
})

module.exports = router;