const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');

router.get('/', middleware.redirectLogin, async(req, res) => {
    console.log("hehe");
    res.send('hello world');
});
module.exports = router;