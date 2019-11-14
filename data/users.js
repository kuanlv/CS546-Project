const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.Users;

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
        console.log("3");
        if (!user) 
            throw "Couldn't find user with this username";
        if (user.password !== password)
            throw "Incorrect password";
        return user;
    },

}

module.exports = exportedMethods;
// const main = async() => {
//     const u = await exportedMethods.getAllusers();
//     console.log(u);
// };

