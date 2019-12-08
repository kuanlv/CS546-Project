const express = require("express");
const router = express.Router();
const middleware = require('../middleware/middleware');
const multer = require('multer');
const path = require('path');
const userData = require('../data').Users;

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
    console.log("get inter");
    console.log(req.session.newid);
    try {
        const user = await userData.findUserById(req.session.newid);
        const id = ObjectId(user._id);
        res.render('intermediate', {
            id: id,
            title: user.username,
            username: user.username,
            hobby: user.profile.hobby,
            occupation: user.profile.occupation, 
            sexOrientation: user.profile.sexOrientation,
            gender: user.profile.gender,
            motto: user.profile.Motto,
            age: user.profile.privateInfo.age,
            location: user.profile.privateInfo.location,
            contact: user.profile.privateInfo.contactInfo
        });
    } catch(e) {
        res.render('intermediate', {error: e});
    }
});

router.post('/', async(req, res) => {
    upload(req, res, async(err) => {
        if(err) 
            return res.render('intermediate', {msg: err});
        const imageName = req.file.filename;
        try{ 
            const user = await userData.findUserById(req.session.newid);
            const id = ObjectId(user._id);
            console.log(req.session);
            await userData.Users.addImageName(req.session.newid, imageName);
            res.render('intermediate', {
                msg: "file uploaded",
                filePath: "uploads/" + req.file.filename,
                id: id,
                title: user.username,
                username: user.username,
                hobby: user.profile.hobby,
                occupation: user.profile.occupation, 
                sexOrientation: user.profile.sexOrientation,
                gender: user.profile.gender,
                motto: user.profile.Motto
            });
        }catch(e) {
            res.render('intermediate', {error: e});
        }  
    })
})

module.exports = router;