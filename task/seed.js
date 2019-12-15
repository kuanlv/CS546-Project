const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const userData = data.Users;
const postData = data.Posts;


async function main() {
    const db = await dbConnection();

    await db.dropDatabase();
// 1 
    const Ariana = {
        username: "Ariana",
        email: "Ariana@gmail.com",
        hashedpassword: "$2b$10$9I2BWcidqeXe9Ma6EK.pN.Cnntu5uPQ7rDoQpttK3TBAqo/EVMVs6",
        likes: [],
        profile: {
            name: "Ariana",
            hobby: "Singing and work out",
            occupation: "professional singer",
            sexOrientation: "male",
            gender: "female",
            Motto: "sorry about the height",
            match: [],
            privateInfo: {  
                contactInfo: "324-231-4522",
                age: "23",
                location: "Hoboken"
            },
            profileImage: "myImage-1576375950095.jpg"
        }
    };


    const ar = await userData.addUser(Ariana);
    await userData.addProfileId(ar._id);

    const Ariana_post = { 
        postTime: "2019-12-13 18:34:7",
        videoTitle: "My new song",
        videoDescription: "I love this song and this MV",
        link: "https://www.youtube.com/embed/9SRxBTtspYM" 
    }

    await postData.addPost(Ariana_post, u._id);
// 2
    const ShanShan = {
        username: "ShanShan",
        email: "Shan@gmail.com",
        hashedpassword: "$2b$10$9I2BWcidqeXe9Ma6EK.pN.Cnntu5uPQ7rDoQpttK3TBAqo/EVMVs6",
        likes: [],
        profile: {
            name: "ShanShan",
            hobby: "Go hiking and build up body",
            occupation: "body builder",
            sexOrientation: "female",
            gender: "female",
            Motto: "Only girls can stir me up!",
            match: [],
            privateInfo: {  
                contactInfo: "324-231-4222",
                age: "27",
                location: "Beijing"
            },
            profileImage: "myImage-1575748859300.jpeg"
        }
    };
    
    const shan = await userData.addUser(ShanShan);
    await userData.addProfileId(shan._id);

    const Shan_post = { 
        postTime: "2019-12-14 13:34:7",
        title: "Today",
        body: "I did lots of work today!"
    }
    await postData.addPost(Shan_post, shan._id);

// 3
    const Baoqiang = {
        username: "Baoqiang",
        email: "Baoqiang@gmail.com",
        hashedpassword: "$2b$10$9I2BWcidqeXe9Ma6EK.pN.Cnntu5uPQ7rDoQpttK3TBAqo/EVMVs6",
        likes: [],
        profile: {
            name: "Baoqiang",
            hobby: "Smoke and tell jokes about me",
            occupation: "actor",
            sexOrientation: "female",
            gender: "male",
            Motto: "Marrige is grave to affection!",
            match: [],
            privateInfo: {  
                contactInfo: "311-321-2343",
                age: "34",
                location: "Henan"
            },
            profileImage: "myImage-1575499578853.jpg"
        }
    };
    
    const Bao = await userData.addUser(Baoqiang);
    await userData.addProfileId(Bao._id);

    const Bao_post = { 
        postTime: "2019-12-15 20:34:7",
        videoTitle: "My classic movie",
        videoDescription: "Take a look at how ordinary Chinese people live",
        link: "https://www.youtube.com/embed/wRrcHAqmOn8"
    }

    await postData.addPost(Bao_post, Bao._id);
// 4
    const HuangBo = {
        username: "HuangBo",
        email: "HuangBo@gmail.com",
        hashedpassword: "$2b$10$9I2BWcidqeXe9Ma6EK.pN.Cnntu5uPQ7rDoQpttK3TBAqo/EVMVs6",
        likes: [],
        profile: {
            name: "HuangBo",
            hobby: "Smoke and talk shit",
            occupation: "actor",
            sexOrientation: "female",
            gender: "male",
            Motto: "Apperance doesn't matter that much!",
            match: [],
            privateInfo: {  
                contactInfo: "203-332-1039",
                age: "37",
                location: "Beijing"
            },
            profileImage: "myImage-1576038773992.jpg"
        }
    };
    
    const Huang = await userData.addUser(HuangBo);
    await userData.addProfileId(Huang._id);

    const Huang_post = { 
        postTime: "2019-12-16 10:31:7",
        videoTitle: "My appearence is my strength",
        videoDescription: "Check out my favorite movie clip. Good old days never came back",
        link: "https://www.youtube.com/embed/H1LPpi6jqdI"
    }

    await postData.addPost(Huang_post, Huang._id);
// 5
    const Mbappe = {
        username: "Mbappe",
        email: "Mbappe@gmail.com",
        hashedpassword: "$2b$10$9I2BWcidqeXe9Ma6EK.pN.Cnntu5uPQ7rDoQpttK3TBAqo/EVMVs6",
        likes: [],
        profile: {
            name: "Mbappe",
            hobby: "Drive fast cars",
            occupation: "soccer player",
            sexOrientation: "female",
            gender: "male",
            Motto: "Speed is the only thing matters on the field!",
            match: [],
            privateInfo: {  
                contactInfo: "203-222-1123",
                age: "21",
                location: "Paris"
            },
            profileImage: "myImage-1576350294943.jpeg"
        }
    };

    const Mb = await userData.addUser(Mbappe);
    await userData.addProfileId(Mb._id);

    const Mb_post = { 
        postTime: "2019-12-15 12:34:7",
        title: "Today",
        body: "I am exshuasted and I want to play baskedball!"
    }
    await postData.addPost(Mb_post, Mb._id);


    console.log('Done seeding database');
    await db.serverConfig.close();
}

    main().catch((error) => {
        console.error(error);
        return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});
