const express = require('express');
const router = express.Router();
const userData = require('../data').Users;
const postData = require('../data').Posts;

router.get('/:id', async(req, res) => {
    const likedUser = await userData.findUserById(req.params.id);
    const isMatch = await userData.isMatch(req.session.userId, likedUser);
    console.log(isMatch);
    if (isMatch) {
        let flag = 0;
        const posts = await postData.getUserPosts(likedUser._id);
        if (posts.length === 0)
            flag = 1;
        return res.render('private', {
            title: `${likedUser.username}'s private area`,
            posts: posts,
            user: likedUser,
            flag: flag
        })
    }
    res.render('error', {
        title: "oops",
        error: `${likedUser.username} and you are not matched!`
    });
})

module.exports = router;
