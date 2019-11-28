const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.Users;
const bcrypt = require('bcrypt');
ObjectId = require("mongodb").ObjectID;

let exportedMethods = {
    async getAllusers() {
        const userCollection = await Users();
        const userlist = await userCollection.find({}).toArray();
        return userlist;
    },

    async findUserbyUsername(username, password) {
        if (!username) 
            throw "Please enter username!";
        const userCollection = await Users();
        const user = await userCollection.findOne({"username": username});
        if (!user) 
            throw "Couldn't find user with this username";
        let flag = false;
        flag = await bcrypt.compare(password, user.hashedpassword);
        if (!flag)
            throw "Incorrect password";
        return user;
    },

    async addUser(user) {
        console.log(1);
        const userCollection = await Users();
        console.log(2);
        console.log(user.profile.Motto);
        const insertionInfo = await userCollection.insertOne(user);
        if (!insertionInfo)
            throw "Can't insert!";
        const newUser = await this.findUserById(insertionInfo.insertedId);
        return newUser;
    },

    async findUserById(id) {
        if (!id)
            throw "No id provided";
        console.log(`find user id: ${id}`);
        const userCollection = await Users();
        const user = await userCollection.findOne({_id: ObjectId(id)});
        if (!user) 
            throw "user with this id not found!";
        return user;
    },

    async addImageName(userId, imageName) {
        if (!imageName)
            throw "No path provided!";
        const userCollection = await Users();
        const updatedInfo = await userCollection.updateOne({_id: ObjectId(userId)}, {$set: { "profile.profileImage": imageName }});
        if (!updatedInfo)
            throw "can't update";
    },

    async findAllUsers() {
        const userCollection = await Users();
        const userList = await userCollection.find({}).toArray();
        return userList;
    },

    async getAllProfile() {
        const userList = await this.findAllUsers();
        let res = [];
        for (let i = 0; i < userList.length; i++) 
            res.push(userList[i].profile);
        return res;
    },

    async isValidUsername(username) {
        if (typeof username !== "stirng")
            throw "username must be a string";
        if (username.length < 3) 
            throw "username length must be greater than 2";
        const userlist = await this.findAllUsers();
        for (let i = 0; i < userlist.length; i++) 
            if (username === userlist[i].username)
                return false;
        return true;
    },

    async addLikes(MyId, IdOfMyLike) {
        if (!MyId || !IdOfMyLike)
            throw "parameter missing!";
        const userCollection = await Users();
        const user = await this.findUserById(MyId);
        
    }
}

module.exports = exportedMethods;
// const main = async() => {
//     const u = await exportedMethods.getAllusers();
//     console.log(u);
// };

