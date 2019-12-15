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

// function isEmpty(obj) {
//     for(var prop in obj) {
//         if(obj.hasOwnProperty(prop))
//             return false;
//     }

//     return true;
// }

router.get('/', middleware.redirectLogin, async(req, res) => {
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
            const u = await userData.addImageName(req.session.newid, imageName);
            res.render('intermediate', {
                filePath: "uploads/" + u.profile.profileImage,
                id: u._id,
                title: u.username,
                username: u.username,
                hobby: u.profile.hobby,
                occupation: u.profile.occupation, 
                sexOrientation: u.profile.sexOrientation,
                gender: u.profile.gender,
                motto: u.profile.Motto,
                age: u.profile.privateInfo.age,
                location: u.profile.privateInfo.location,
                contact: u.profile.privateInfo.contactInfo
            });
        }catch(e) {
            console.log(e);
            res.render('intermediate', {title: "error"});
        }  
    })
})

module.exports = router;