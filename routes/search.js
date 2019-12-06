const express = require("express");
const router = express.Router();
const userData = require('../data');

router.post('/', async(req, res) => {
    console.log(req.body);
    console.log(req.session);
    const searchContent = req.body;
    if (searchContent.hobby === '' && searchContent.occupation === '') {
        const profiles = await userData.Users.getAllProfile(req.session.userId);
        return res.render('date', { 
            profiles: profiles, 
            title: "user list", 
            id: req.session.userId });
    }
    const searchResult = await userData.Users.search(searchContent, req.session.userId);
    console.log(3);
    console.log(searchResult);
    res.render('date', {
        profiles: searchResult,
        title: "search result", 
        id: req.session.userId 
    })
})

module.exports = router;