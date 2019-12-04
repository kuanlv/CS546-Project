const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const userData = require('../data');

router.get('/', middleware.redirectLogin, async(req, res) => {
    try{
        const profiles = await userData.Users.getAllProfile(req.session.userId);
        res.render('date', { profiles: profiles, title: "user list", id: req.session.userId });
    } catch(e) {
        res.status(400).send({error: e});
    }
});

router.post('/', async(req, res) => {
    try{
        console.log(req.body);
        const name = req.body.name;
        if (req.body.operation === "like") {
            const LikedUser = await userData.Users.findUserbyUsername(name);
            const likedId = LikedUser._id;
            await userData.Users.addLikes(req.session.userId, likedId);
            const profiles = await userData.Users.getAllProfile(req.session.userId);
            const isMatch = await userData.Users.isMatch(req.session.userId, LikedUser);
            console.log(isMatch);
            if (isMatch)
                await userData.Users.addMatch(req.session.userId, likedId);
            res.render('date', { 
                profiles: profiles, 
                title: "user list", 
                id: req.session.userId
            });
        } else if (req.body.operation === "dislike") {
            const disLikedUser = await userData.Users.findUserbyUsername(name);
            const dislikedId = disLikedUser._id;
            await userData.Users.removeLikes(req.session.userId, dislikedId);
            await userData.Users.removeMatch(req.session.userId, dislikedId);
            console.log("remove likes");
            res.status(200);
        }
    }catch(e) {
        res.status(400).send({error: e});
    }
})

module.exports = router;