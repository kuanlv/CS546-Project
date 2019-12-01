const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const userData = require('../data');

router.get('/', middleware.redirectLogin, async(req, res) => {
    try{
        const profiles = await userData.Users.getAllProfile(req.session.userId);
        res.render('date', { profiles });
    } catch(e) {
        res.status(400).send({error: e});
    }
});

module.exports = router;