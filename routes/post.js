const express = require('express');
const router = express.Router();
const userData = require('../data').Users;
const postData = require('../data').Posts;


router.get('/:id', async(req, res) => {
    try{
        console.log('here get in')
        console.log(req.session.userId);
        const posts = await postData.getUserPosts(req.session.userId);
        console.log(posts);
        res.render('post', {
            id: req.session.userId,
            posts: posts,
            title: "post area"
        });
    }catch(e) {

    }
})

router.post('/:id', async(req, res) => {
    console.log(req.body);

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const postTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    const post = req.body;
    try {
        if (post.title !== '' && post.videoTitle === '') {
            let newPost = {
                postTime: postTime,
                title: post.title,
                body: post.body
            };
            await postData.addPost(newPost, req.session.userId);
        }
        else if (post.title !== '' && post.videoTitle !== '') {
            post.postTime = postTime;
            await postData.addPost(post, req.session.userId);
        }
        else if (post.title === '' && post.videoTitle !== '') {
            let newPost = {
                postTime: postTime,
                videoTitle: post.videoTitle,
                videoDescription: post.videoDescription,
                link: post.link
            };
            await postData.addPost(newPost, req.session.userId);
        }
        const posts = await postData.getUserPosts(req.session.userId);
        res.render('post', {
            id: req.session.userId,
            posts: posts,
            title: "User Post"
        });
    } catch(e) {

    }
})


module.exports = router;