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
    },

    async findUserById(id) {
        if (!id)
            throw "No id provided";
        const userCollection = await Users();
        const user = await userCollection.findOne({_id: ObjectId(id)});
        if (!user) 
            throw "user with this id not found!";
        return user;
    }
}

module.exports = exportedMethods;
// const main = async() => {
//     const u = await exportedMethods.getAllusers();
//     console.log(u);
// };

