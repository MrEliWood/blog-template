// import models
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment")

// define relationships
User.hasMany(Blog);
User.hasMany(Comment);

Blog.belongsTo(User);
Blog.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Blog);

// export
module.exports = { User, Blog, Comment };