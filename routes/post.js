const express = require('express');
const router = express.Router();
const userData = require('../data');

router.get('/:id', async(req, res) => {
    console.log("hello");
    res.render('post', {
        id: req.session.userId,
        title: "post area"
    });
})

router.post('/:id', async(req, res) => {
    console.log(req.body);
    res.send("you got it");
})


module.exports = router;