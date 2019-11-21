const express = require("express");
const router = express.Router();
const middleware = require('../middleware/middleware');
const multer = require('multer');
const path = require('path');
const userData = require('../data');

// set up multer and upload function //
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('error: image only!');
    }
}

router.get('/', middleware.redirectLogin, async(req, res) => {
    console.log("get profile");
    console.log(req.session.newid);
    try {
        const user = await userData.Users.findUserById(req.session.newid);
        console.log(user);
        res.render('profile', {
            title: user.username,
            username: user.username,
            hobby: user.profile.hobby,
            occupation: user.profile.occupation, 
            sexOrientation: user.profile.sexOrientation,
            gender: user.profile.gender,
            motto: user.profile.Motto,
        });
    } catch(e) {
        res.render('profile', {error: e});
    }
});

router.post('/', async(req, res) => {
    upload(req, res, async(err) => {
        if(err) 
            return res.render('profile', {msg: err});
        console.log(req.file);
        const imagePath = req.file.path;
        try{ 
            await userData.Users.addImagePath(req.session.userId, imagePath);
            res.render('profile', {
                msg: "file uploaded",
                file: "uploads/" + req.file.filename
            });
        }catch(e) {
            res.render('profile', {error: e});
        }  
    })
})

module.exports = router;