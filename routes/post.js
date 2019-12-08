const express = require('express');
const router = express.Router();
const userData = require('../data').Users;
const postData = require('../data').Posts;


router.get('/:id', async(req, res) => {
    console.log("hello");
    res.render('post', {
        id: req.session.userId,
        title: "post area"
    });
})

router.post('/:id', async(req, res) => {
    console.log(req.body);
    const post = req.body;
    try {
        console.log('12');
        await postData.addPost(post, req.session.userId);
    } catch(e) {

    }

    res.render('post');
})


module.exports = router;