const express = require('express');
const router = express.Router();
const path = require("path");
const userData = require('../data').Users;

router.get('/', (req, res) => {
   res.sendFile(path.resolve('html/home.html')); 
});

router.post('/', async(req, res) => {
   console.log(req.body);
   const flag = await userData.isValidUsername(req.body.username);
   console.log(flag);
   if (!flag) {
      console.log('comming in');
      res.render('signup', {
         error: "Username already in use!",
         username: "choose another one!",
         title: "hehe"
      });
   }
   else {
      res.render('signup', {
         username: req.body.username
      })
   }
});

module.exports = router;