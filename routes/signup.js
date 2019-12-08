const express = require('express');
const router = express.Router();
const path = require("path");
const userData = require('../data').Users;
const bcrypt = require('bcrypt');
const middleware = require('../middleware/middleware');
const saltRounds = 10;

router.get('/', middleware.redirectDate, async(req, res) => {
    res.sendFile(path.resolve('./html/signup.html'));
});


router.post('/', async(req, res) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    console.log(req.body);
    const newUser = {
        username: req.body.username,
        email: req.body.email, 
        hashedpassword: hash,
        likes: [],
        profile: {
            name: req.body.username,
            hobby: req.body.hobby,
            occupation: req.body.occupation, 
            sexOrientation: req.body.sexo,
            gender: req.body.gender,
            Motto: req.body.motto,
            match: [],
            privateInfo: {
                contactInfo: req.body.contactInfo, 
                age: req.body.age,
                location: req.body.location
            }
        }
    }
    console.log(newUser);
    // if (!email || !req.bodyname || !password || !confirmPassword || !sexo || !gender || !motto || !phoneNumber || !age || !location)
    //     return res.redirect('/signup');
    // if (password !== confirmPassword)
    //     return res.redirect('/signup');
    try {
        console.log("signup post")
        const u = await userData.addUser(newUser);
        req.session.newid = u._id;
        await userData.addProfileId(u._id);
        res.redirect('/intermediate');
    }catch(e) {
        console.log(e);
        res.redirect('/signup');
    }
});

module.exports = router;