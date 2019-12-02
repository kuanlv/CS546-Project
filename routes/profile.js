const express = require("express");
const router = express.Router();
const userData = require('../data');

router.get('/:id', async(req, res) => {
    try {
        console.log('get id')
        const user = await userData.Users.findUserById(req.params.id);
        res.render('profile', { user: user, title: user.username });
    } catch(e) {
        res.status(404).send({error: "haha"});
    }
})

router.post('/', async(req, res) => {
    try{
        const name = req.body.name;
        const LikedUser = await userData.Users.findUserbyUsername(name);
        console.log(LikedUser);
        const likedId = LikedUser._id;
        return await userData.Users.addLikes(req.session.userId, likedId);
    }catch(e) {
        res.status(400).send({error: e});
    }
})

router.post('/:id', async(req, res) => {
    console.log("haha");
    return;
})

module.exports = router;