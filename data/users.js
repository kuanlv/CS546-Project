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

    async findUserbyUsername(username) {
        const userCollection = await Users();
        const user = await userCollection.findOne({"username": username});
        if (user === 'undefined')
            throw "user not found somehow";
        return user;
    },

    async addUser(user) {
        const userCollection = await Users();
        const insertionInfo = await userCollection.insertOne(user);
        if (!insertionInfo)
            throw "Can't insert!";
        const newUser = await this.findUserById(insertionInfo.insertedId);
        return newUser;
    },

    async addProfileId(userId) {
        const userCollection = await Users();
        const updatedInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) }, { $set: { "profile.profileId": userId } }
        );
        if (!updatedInfo)
            throw "can't add profile id";
        console.log("success add profile id");
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

    async getAllProfile(userId) {
        const user = await this.findUserById(userId);
        const userList = await this.findAllUsers();
        const sexo = user.profile.sexOrientation;
        let result = [];
        if (sexo === "female") {
            for (let i = 0; i < userList.length; i++) {
                if (userList[i]._id == userId)
                    continue;
                if (userList[i].profile.gender === "female")
                    result.push(userList[i].profile);
            }
            return result;
        }

        if (sexo === "male") {
            for (let i = 0; i < userList.length; i++) {
                if (userList[i]._id == userId) 
                    continue;
                if (userList[i].profile.gender === "male")
                    result.push(userList[i].profile);
            }
            return result;
        }
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

    async isPasswordCorrect(username, password) {
        const user = await this.findUserbyUsername(username);
        if (user === "undefined")
            throw "username is not right!";
        const flag = await bcrypt.compare(password, user.hashedpassword);
        if (flag === false)
            throw "password not right";
    },

    async addLikes(MyId, IdOfMyLike) {
        if (!MyId || !IdOfMyLike)
            throw "parameter missing: add like";
        const userCollection = await Users();
        // const user = await this.findUserById(MyId);
        // const flag = user.likes.includes(`${IdOfMyLike}`);
        // console.log(IdOfMyLike);
        // console.log("1");
        // console.log(flag);
        const updatedInfo = await userCollection.updateOne(
            { _id: ObjectId(MyId) }, { $push: { likes: IdOfMyLike } });
        if (updatedInfo === 'undefined')
            throw "can't update likes";
        console.log('success add like');
    },

    async removeLikes(MyId, IdOfMyDisLike) {
        // if (!MyId || !IdOfMyDisLike)
        //     throw "parameter missing: remove like";
        console.log("remove");
        const userCollection = await Users();
        const updatedInfo = await userCollection.updateOne(
            {_id: ObjectId(MyId)}, { $pull: { likes: IdOfMyDisLike } })
        if (!updatedInfo)
            throw "no dislike id found!";
        console.log('success removed');
    },

    async updateImage(id, imageName) {
        if (!imageName)
            throw "No image name provided";
        const userCollection = await Users();
        const updatedInfo = await userCollection.updateOne(
            { _id: ObjectId(id) }, { $set: { "profile.profileImage": imageName }});
        if (!updatedInfo)
            throw "couldn't update image name";
    },

    async replaceUser(id, updatedUser) {
        if (!updatedUser)
            throw "nothing to update";
        const userCollection = await Users();
        const updatedInfo = await userCollection.replaceOne(
            {_id: ObjectId(id)}, updatedUser);
        if (!updatedInfo)
            throw "can't update user";
        console.log('success');
    },

    async isMatch(MyId, likedUser) {
        if (!MyId || !likedUser)
            throw "argument missing: isMatch";
        for (let i = 0; i < likedUser.likes.length; i++) {
            if (likedUser.likes[i] == MyId)
                return true;
        }
        return false;
    },

    async addMatch(MyId, likedId) {
        if (!MyId || !likedId)
            throw "argument missing: add match";
        const userCollection = await Users();
        const user = await this.findUserById(MyId);
        if (user.profile.match.includes(likedId))
            return;
        const updatedInfo1 = await userCollection.updateOne(
            { _id: ObjectId(MyId) }, { $push: { "profile.match": likedId }}
        );

        const updatedInfo2 = await userCollection.updateOne(
            { _id: ObjectId(likedId) }, { $push: { "profile.match": MyId }}
        );

        if (!updatedInfo1 || !updatedInfo2)
            throw "can't match";
        console.log('success match');
    },

    async removeMatch(MyId, dislikedId) {
        if (!MyId || !dislikedId)
            throw "argument missing: remove match";
        if (!this.isMatch(MyId, dislikedId)) {
            console.log("They didn't match in the first place");
            return;
        }
        const userCollection = await Users();
        const updatedInfo1 = await userCollection.updateOne(
            {_id: ObjectId(MyId)}, { $pull: { "profile.match": dislikedId } }
        );
        const updatedInfo2 = await userCollection.updateOne(
            {_id: ObjectId(dislikedId)}, { $pull: { "profile.match": MyId } }
        );

        if (!updatedInfo1 || !updatedInfo2)
            throw "can't dismatch";
        console.log('success dismatch');
    }

}

module.exports = exportedMethods;
// const main = async() => {
//     const u = await exportedMethods.getAllusers();
//     console.log(u);
// };

