const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('logout', {
        id: req.session.userId,
        title: "logout"
    });
});

router.post('/', async(req, res) => {
    req.session.destroy();
    // req.session.destroy(err => {
    //     if (err)
    //         return console.log(err);
    //     });
    // res.redirect('/');
    res.sendStatus(200);
});

module.exports = router;