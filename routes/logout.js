const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('logout');
});

router.post('/', async(req, res) => {
    req.session.destroy(err => {
        if (err)
            return console.log(err);
        res.redirect('/home');
    });
});

module.exports = router;