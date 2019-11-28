const express = require("express");
const router = express.Router();
const userData = require('../data');

router.get('/:id', async(req, res) => {
    try {
        console.log('get id')
        const user = await userData.Users.findUserById(req.params.id);
        res.render('profile', {user: user});
    } catch(e) {
        res.status(404).send({error: "haha"});
    }
})

router.post('/', async(req, res) => {
    const name = req.body.name;
    const user = await userData.Users.findUserbyUsername(name);
    const likedId = user._id;
    
    console.log(req.session.userId);
})

module.exports = router;