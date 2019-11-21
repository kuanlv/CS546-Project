const express = require('express');
const router = express.Router();
const path = require("path");
const data = require('../data');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', async(req, res) => {
    res.sendFile(path.resolve('./html/signup.html'));
});


router.post('/', async(req, res) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = {
        username: req.body.username,
        email: req.body.email, 
        hashedpassword: hash,
        likes: [],
        profile: {
            name: req.body.username,
            hobby: req.body.hobby, 
            sexOrientation: req.body.sexo,
            gender: req.body.gender,
            Motto: req.body.motto,
        }, 
        privateInfo: {
            contactInfo: req.body.contactInfo, 
            age: req.body.age,
            location: req.body.location
        }
    }
    console.log(newUser);
    // if (!email || !req.bodyname || !password || !confirmPassword || !sexo || !gender || !motto || !phoneNumber || !age || !location)
    //     return res.redirect('/signup');
    // if (password !== confirmPassword)
    //     return res.redirect('/signup');
    try {
        console.log("bb")
        const u = await data.Users.addUser(newUser);
        req.session.userId = u._id;
        res.redirect('/profile');
    }catch(e) {
        console.log(e);
        res.redirect('/signup');
    }
});

module.exports = router;