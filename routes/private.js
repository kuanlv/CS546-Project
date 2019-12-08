const express = require('express');
const router = express.Router();
const userData = require('../data').Users;

router.get('/:id', async(req, res) => {
    const likedUser = await userData.findUserById(req.params.id);
    const isMatch = await userData.isMatch(req.session.userId, likedUser);
    console.log(isMatch);
    if (isMatch)
        return res.render('private', {
            user: likedUser
        })
    res.render('error', {
        title: "oops",
        error: `${likedUser.username} and you are not matched!`
    });
})

module.exports = router;
