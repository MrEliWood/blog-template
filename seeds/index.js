// import modules and packages
const sequelize = require("../config/connection");
const { User, Blog } = require("../models");

// user seeds
const users = [
    {
        username: "firstuser",
        password: "password1"
    },
    {
        username: "seconduser",
        password: "password2"
    },
    {
        username: "thirduser",
        password: "password3"
    }
];

// blog seeds
const blogs = [
    {
        title: "first blog",
        body: "This is the first blog post on this tech blog website.",
        UserId:1
    },
    {
        title: "second blog",
        body: "This is the second blog post on this tech blog website.",
        UserId: 2
    },
    {
        title: "third blog",
        body: "This is the third blog post on this tech blog website.",
        UserId: 3
    }
];

// bulk create
const seed = async () => {

    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(users, { individualHooks: true });
        await Blog.bulkCreate(blogs);

        process.exit(0);
    } catch(err){
        console.log(err);
    };

};

seed();