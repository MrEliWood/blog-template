// import modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define class extension
class Blog extends Model { };

// define model properties
Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize
});

// export
module.exports = Blog;