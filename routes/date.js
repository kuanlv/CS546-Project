const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const userData = require('../data').Users;

router.get('/', middleware.redirectLogin, async(req, res) => {
    try{
        const profiles = await userData.getAllProfile(req.session.userId);
        res.render('date', { 
            profiles: profiles, 
            title: "user list", 
            id: req.session.userId 
        });
    } catch(e) {
        res.status(400).send({error: e});
    }
});

router.post('/', async(req, res) => {
    try{
        const name = req.body.name;
        if (req.body.operation === "like") {
            const LikedUser = await userData.findUserbyUsername(name);
            const likedId = LikedUser._id;
            await userData.addLikes(req.session.userId, likedId);
            const profiles = await userData.getAllProfile(req.session.userId);
            const check = await userData.CheckMatch(req.session.userId, LikedUser);
            if (check)
                await userData.addMatch(req.session.userId, likedId);
            res.render('date', { 
                profiles: profiles, 
                title: "user list", 
                id: req.session.userId
            });
        } else if (req.body.operation === "dislike") {
            const disLikedUser = await userData.findUserbyUsername(name);
            const dislikedId = disLikedUser._id;
            await userData.removeLikes(req.session.userId, dislikedId);
            await userData.removeMatch(req.session.userId, dislikedId);
            res.status(200);
        }
    } catch(e) {
        res.status(400).send({error: e});
    }
})

module.exports = router;