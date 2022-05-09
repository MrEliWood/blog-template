// import modules and packages
const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// home page route
router.get("/", (req,res) => {

    Blog.findAll({
            include: [Comment]
        })
        .then(blogs => {
            const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
            const loggedIn = req.session.user ? true : false;

            res.render("home", { blogs: hbsBlogs, loggedIn, username: req.session.user?.username });
        });

});

// login route
router.get("/login", (req,res) => {

    if(req.session.user){
        return res.redirect("/dashboard");
    };

    res.render("login");

});

// logout route
router.get("/logout", (req,res) => {

    req.session.destroy();
    res.redirect("/");

});

// signup route
router.get("/signup", (req,res) => {

    if(req.session.user){
        return res.redirect("/dashboard");
    };

    res.render("signup");

});

// dashboard route
router.get("/dashboard", (req,res) => {

    if(!req.session.user){
        return res.redirect("/login");
    };

    User.findByPk(req.session.user.id, {
        include: [Blog]
    }).then(userData=>{
        const hbsData = userData.get({ plain: true })
        hbsData.loggedIn = req.session.user? true : false;

        res.render("dashboard", hbsData);
    });

});

// export
module.exports = router;