const express = require('express');
const router = express.Router();
const userData = require('../data');

router.get('/:id', async(req, res) => {
    console.log(req.session.userId);
    console.log(req.params.id);
    const likedUser = await userData.Users.findUserById(req.params.id);
    const isMatch = await userData.Users.isMatch(req.session.userId, likedUser);
    console.log(1);
    console.log(isMatch);
    if (isMatch)
        return res.render('private', {
            user: likedUser
        })
    res.render('error', {
        error: `${likedUser.username} and you are not matched!`
    });
})

module.exports = router;
