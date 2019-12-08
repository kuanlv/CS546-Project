const mongoCollections = require('../config/mongoCollections');
const Posts = mongoCollections.Posts;
const userFn = require('./users');
ObjectId = require("mongodb").ObjectID;

let exportedMethods = {
    async getPostByUserId(userId) {
        if (!userId) 
            throw "No userId provided for post";
        const postCollections = await Posts();
        const post = await postCollections.findOne(
            { userId: ObjectId(userId) }
        );
        if (!post)
            throw "No post found with this userId";
        return post;
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
        console.log('here l')
        const postCollections = await Posts();
        console.log(1);
        const updatedInfo = await postCollections.updateOne(
            { userId: ObjectId(userId) },
            { $push: { posts: post } }
        );
        console.log(2);
        if (!updatedInfo)
            throw "can't add post";
    },

    async getUserPosts(userId) {
        let res = await this.getPostByUserId(userId).posts;
        return res;
    }
};

module.exports = exportedMethods;