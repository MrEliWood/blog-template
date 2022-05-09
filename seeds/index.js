// import modules and packages
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

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
        user_id: 1
    },
    {
        title: "second blog",
        body: "This is the second blog post on this tech blog website.",
        user_id: 2
    },
    {
        title: "third blog",
        body: "This is the third blog post on this tech blog website.",
        user_id: 3
    }
];

// comment seeds
const comments = [
    {
        body: "This is the first comment on this tech blog website.",
        user_id: 2,
        blog_id: 1
    },
    {
        body: "This is the second comment on this tech blog website.",
        user_id: 3,
        blog_id: 1
    },
    {
        body: "This is the third comment on this tech blog website.",
        user_id: 1,
        blog_id: 1
    }
];

// bulk create
const seed = async () => {

    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(users, { individualHooks: true });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);

        process.exit(0);
    } catch(err){
        console.log(err);
    };

};

seed();