const express = require("express");
const router = express.Router();
const userData = require('../data').Users;
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
        const user = await userData.findUserById(req.params.id);
        res.render('profile', { 
            id: user._id,
            user: user, 
            title: user.username, 
            imageName: user.profile.profileImage });
    } catch(e) {
        res.status(404).send({error: "haha"});
    }
})


router.post('/:id', async(req, res) => {
    upload(req, res, async(err) => {
        if(err) 
            return res.render('profile', {msg: err});
        const imageName = req.file.filename;
        console.log(imageName);
        try{ 
            const user = await userData.findUserById(req.params.id);
            await userData.updateImage(req.params.id, imageName);
            res.render('profile', {
                id: req.session.userId,
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