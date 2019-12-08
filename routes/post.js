const express = require('express');
const router = express.Router();
const userData = require('../data').Users;
const postData = require('../data').Posts;


router.get('/:id', async(req, res) => {
    try{
        console.log('here get in')
        console.log(req.session.userId);
        const posts = await postData.getPostByUserId(req.session.userId);
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
    const post = req.body;
    try {
        if (post.title !== '' && post.videoTitle === '') {
            let newPost = {
                title: post.title,
                body: post.body
            };
            await postData.addPost(newPost, req.session.userId);
        }
        else if (post.title !== '' && post.videoTitle !== '') {
            await postData.addPost(post, req.session.userId);
        }
        else if (post.title === '' && post.videoTitle !== '') {
            let newPost = {
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