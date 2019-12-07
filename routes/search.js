const express = require("express");
const router = express.Router();
const userData = require('../data');

router.post('/', async(req, res) => {
    console.log(req.body.hobby);
    const searchContent = req.body;
    if (searchContent.hobby === '' && searchContent.occupation === '' && typeof(searchContent.sexo) === "undefined") {
        const profiles = await userData.Users.getAllProfile(req.session.userId);
        return res.render('date', { 
            profiles: profiles, 
            title: "user list", 
            id: req.session.userId });
    }
    const searchResult = await userData.Users.search(searchContent, req.session.userId);
    res.render('date', {
        profiles: searchResult,
        title: "search result", 
        id: req.session.userId 
    })
})

module.exports = router;