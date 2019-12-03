const express = require("express");
const router = express.Router();
const userData = require('../data');
const multer = require('multer');
const path = require('path');


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

router.get('/:id', async(req, res) => {
    try {
        console.log('get id')
        const user = await userData.Users.findUserById(req.params.id);
        res.render('profile', { user: user, title: user.username, imageName: user.profile.profileImage });
    } catch(e) {
        res.status(404).send({error: "haha"});
    }
})

router.post('/', async(req, res) => {
    try{
        console.log(req.body);
        const name = req.body.name;
        if (req.body.operation === "like") {
            const LikedUser = await userData.Users.findUserbyUsername(name);
            const likedId = LikedUser._id;
            await userData.Users.addLikes(req.session.userId, likedId);
            res.status(200);
        } else if (req.body.operation === "dislike") {
            const disLikedUser = await userData.Users.findUserbyUsername(name);
            const likedId = disLikedUser._id;
            await userData.Users.removeLikes(req.session.userId, likedId);
            res.status(200);
        }
    }catch(e) {
        res.status(400).send({error: e});
    }
})

router.post('/:id', async(req, res) => {
    upload(req, res, async(err) => {
        if(err) 
            return res.render('profile', {msg: err});
        const imageName = req.file.filename;
        console.log(imageName);
        try{ 
            const user = await userData.Users.findUserById(req.params.id);
            await userData.Users.updateImage(req.params.id, imageName);
            res.render('profile', {
                title: user.username + "'s profile",
                imageName: imageName,
                user: user
            });
        }catch(e) {
            res.render('profile', {error: e});
        }  
    })
})

module.exports = router;