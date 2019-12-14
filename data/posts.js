const mongoCollections = require('../config/mongoCollections');
const Posts = mongoCollections.Posts;
const userFn = require('./users');
ObjectId = require("mongodb").ObjectID;

let exportedMethods = {
    async getUserPosts(userId) {
        if (typeof(userId) === 'undefined') 
            throw "No userId provided for post";
        const postCollections = await Posts();
        const post = await postCollections.findOne(
            { userId: ObjectId(userId) }
        );
        // if (!post)
        //     throw "No post found with this userId";
        let res = post.posts;
        return res;
    },

    async findPostById(postId) {
        if (!postId)
            throw "no post id provided";
        const postCollections = await Posts();
        const post = await postCollections.findOne(
            { _id: ObjectId(postId) }
        );
        return post;
    },

    async addPost(post, userId) {
        if (typeof post === 'undefined')
            throw "undefined post";
        const postCollections = await Posts();
        const updatedInfo = await postCollections.updateOne(
            { userId: ObjectId(userId) },
            { $push: { posts: post } }
        );
        if (!updatedInfo)
            throw "can't add post";
    },

    async findSinglePosts(userId, postTime) {
        const posts = await this.getUserPosts(userId);
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].postTime === postTime)
                return posts[i];
        }
        console.log('no such posts');
        return null;
    },

    async deletePost(userId, postTime) {
        const singlePost = await this.findSinglePosts(userId, postTime);
        if (singlePost === null) {
            console.log("can't delete null");
            return null;
        }
        const postCollections = await Posts();
        const updatedInfo = await postCollections.updateOne(
            { userId: userId }, 
            { $pull: { posts: singlePost } }
        );
        if (!updatedInfo) 
            throw "can't delete it somehow!";
        console.log('success delete it');
    }

};

module.exports = exportedMethods;