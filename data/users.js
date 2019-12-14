const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.Users;
const Posts = mongoCollections.Posts;
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
            return null;
        return user;
    },

    async addUser(user) {
        const userCollection = await Users();
        const postCollection = await Posts();
        const insertionInfo1 = await userCollection.insertOne(user);
        let post = {
            username: user.username,
            userId: insertionInfo1.insertedId,
            posts: []
        }
        const insertionInfo2 = await postCollection.insertOne(post);
        if (!insertionInfo1 || !insertionInfo2)
            throw "Can't insert!";
        const newUser = await this.findUserById(insertionInfo1.insertedId);
        return newUser;
    },

    async addProfileId(userId) {
        const userCollection = await Users();
        const updatedInfo = await userCollection.updateOne(
            { _id: ObjectId(userId) }, { $set: { "profile.profileId": userId } }
        );
        if (!updatedInfo)
            throw "can't add profile id";
    },

    async findUserById(id) {
        // if (!id)
        //     throw "No id provided";
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
        return await this.findUserById(userId);
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
        const userlist = await this.findAllUsers();
        for (let i = 0; i < userlist.length; i++) 
            if (username === userlist[i].username)
                return false;
        return true;
    },

    async isPasswordCorrect(username, password) {
        const user = await this.findUserbyUsername(username);
        if (user === "undefined")
            return false;
        const flag = await bcrypt.compare(password, user.hashedpassword);
        if (flag === false)
            return false;
        return true;
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
    },

    async removeLikes(MyId, IdOfMyDisLike) {
        // if (!MyId || !IdOfMyDisLike)
        //     throw "parameter missing: remove like";
        const userCollection = await Users();
        const updatedInfo = await userCollection.updateOne(
            {_id: ObjectId(MyId)}, { $pull: { likes: IdOfMyDisLike } })
        if (!updatedInfo)
            throw "no dislike id found!";
    },

    async getFavorite(userId) {
        const user = await this.findUserById(userId);
        const likes = user.likes;
        let res = [];
        let output = [];
        for (let i = likes.length - 1; i >= 0; i--) {
            if (res.includes(likes[i]))
                continue;
            res.push(likes[i]);
        }
        for (let i = 0; i < res.length; i++) {
            const likedUser = await this.findUserById(res[i]);
            output.push(likedUser.profile);
        }
        return output;
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
    },

    async isMatch(MyId, likedUser) {
        if (!MyId || !likedUser)
            throw "argument missing: isMatch";
        if (typeof(likedUser.profile.match) === "undefined")
            return false;
        for (let i = 0; i < likedUser.profile.match.length; i++) {
            if (likedUser.profile.match[i] == MyId)
                return true;
        }
        return false;
    },

    async CheckMatch(MyId, likedUser) {
        if (!MyId || !likedUser)
            throw "argument missing: check Match";
        if (typeof(likedUser.likes) === "undefined")
            return false;
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
    },

    async removeMatch(MyId, dislikedId) {
        if (!MyId || !dislikedId)
            throw "argument missing: remove match";
        const dislikeUser = await this.findUserById(dislikedId);

        if (!await this.isMatch(MyId, dislikeUser)) {
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
    },

    async search(searchContent, userId) {
        const profiles = await this.getAllProfile(userId);
        let res = [];
        // type 1 :  1 0 u
        if (searchContent.hobby !== '' && searchContent.occupation === '' && typeof(searchContent.sexo) === 'undefined') {
            for (let i = 0; i < profiles.length; i++) {
                if (profiles[i].hobby.toLowerCase().includes(searchContent.hobby.toLowerCase())) {
                    res.push(profiles[i]);
                }
            }
            return res;
        }

        // type 2 : 1 1 u
        if (searchContent.hobby !== '' && searchContent.occupation !== '' && typeof(searchContent.sexo) === 'undefined') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].hobby.toLowerCase().includes(searchContent.hobby.toLowerCase())) 
                    continue;
                if (!profiles[i].occupation.toLowerCase().includes(searchContent.occupation.toLowerCase())) 
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        //  0 1 u 
        if (searchContent.hobby === '' && searchContent.occupation !== '' && typeof(searchContent.sexo) === 'undefined') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].occupation.toLowerCase().includes(searchContent.occupation.toLowerCase())) 
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // type 3: 1 1 m 
        if (searchContent.hobby !== '' && searchContent.occupation !== '' && searchContent.sexo === 'male') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].hobby.toLowerCase().includes(searchContent.hobby.toLowerCase())) 
                    continue;
                if (!profiles[i].occupation.toLowerCase().includes(searchContent.occupation.toLowerCase())) 
                    continue;
                if (profiles[i].sexOrientation === 'female')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // type 4: 1 1 f
        if (searchContent.hobby !== '' && searchContent.occupation !== '' && searchContent.sexo === 'female') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].hobby.toLowerCase().includes(searchContent.hobby.toLowerCase())) 
                    continue;
                if (!profiles[i].occupation.toLowerCase().includes(searchContent.occupation.toLowerCase())) 
                    continue;
                if (profiles[i].sexOrientation === 'male')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // type 5: 0 0 m
        if (searchContent.hobby === "" && searchContent.occupation === "" && searchContent.sexo === 'male') {
            for (let i = 0; i < profiles.length; i++) {
                if (profiles[i].sexOrientation === 'female')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // type 6: 0 0 f
        if (searchContent.hobby === '' && searchContent.occupation === '' && searchContent.sexo === 'female') {
            for (let i = 0; i < profiles.length; i++) {
                if (profiles[i].sexOrientation === 'male')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // type 7: 1 0 m
        if (searchContent.hobby !== '' && searchContent.occupation === '' && searchContent.sexo === 'male') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].hobby.toLowerCase().includes(searchContent.hobby.toLowerCase())) 
                    continue;
                if (profiles[i].sexOrientation === 'female')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // type 8: 1 0 f
        if (searchContent.hobby !== '' && searchContent.occupation === '' && searchContent.sexo === 'female') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].hobby.toLowerCase().includes(searchContent.hobby.toLowerCase())) 
                    continue;
                if (profiles[i].sexOrientation === 'male')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // 0 1 f
        if (searchContent.hobby === '' && searchContent.occupation !== '' && searchContent.sexo === 'female') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].occupation.toLowerCase().includes(searchContent.occupation.toLowerCase())) 
                    continue;
                if (profiles[i].sexOrientation === 'male')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }

        // 0 1 m
        if (searchContent.hobby === '' && searchContent.occupation !== '' && searchContent.sexo === 'male') {
            for (let i = 0; i < profiles.length; i++) {
                if (!profiles[i].occupation.toLowerCase().includes(searchContent.occupation.toLowerCase())) 
                    continue;
                if (profiles[i].sexOrientation === 'female')
                    continue;
                res.push(profiles[i]);
            }
            return res;
        }
    }

}

module.exports = exportedMethods;
// const main = async() => {
//     const u = await exportedMethods.getAllusers();
//     console.log(u);
// };

