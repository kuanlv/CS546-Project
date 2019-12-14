const express = require('express');
const router = express.Router();
const userData = require('../data').Users;

router.get('/:id', async(req, res) => {
    const favorites = await userData.getFavorite(req.session.userId);
    let flag = 0;
    if (favorites.length === 0) {
        flag = 1;
        return res.render('favorites', {
            id: req.session.userId,
            flag: flag,
            title: "Favorites"
        })
    }
    res.render('favorites', {
        id: req.session.userId,
        profiles: favorites,
        flag: flag,
        title: "Favorites"
    })
})

module.exports = router;