// import modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define class extension
class Comment extends Model { };

// define model properties
Comment.init({
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize
});

// export
module.exports = Comment;