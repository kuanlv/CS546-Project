const express = require('express');
const router = express.Router();
const userData = require('../data');

router.post('/:id', async(req, res) => {
    try {
        const user = await userData.Users.findUserById(req.params.id);
        let updatedUser = user;
        if (req.body.hobby != updatedUser.profile.hobby)
            updatedUser.profile.hobby = req.body.hobby;
        if (req.body.occupation != updatedUser.profile.occupation)
            updatedUser.profile.occupation = req.body.occupation;
        if (req.body.motto != updatedUser.profile.Motto)
            updatedUser.profile.Motto = req.body.motto;
        if (req.body.contactInfo != updatedUser.profile.privateInfo.contactInfo)
            updatedUser.profile.privateInfo.contactInfo = req.body.contactInfo;
        if (req.body.age != updatedUser.profile.privateInfo.age)
            updatedUser.profile.privateInfo.age = req.body.age;
        if (req.body.location != updatedUser.profile.privateInfo.location)
            updatedUser.profile.privateInfo.location = req.body.location;
        await userData.Users.replaceUser(req.params.id, updatedUser);

        res.render('profile', {
            user: user,
            title: user.username,
            imageName: user.profile.profileImage
        });
    } catch(e) {
        res.render('profile', {error: e});
    }
})

module.exports = router;