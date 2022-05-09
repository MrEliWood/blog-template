// import modules and packages
const express = require('express');
const router = express.Router();
const { User, Blog } = require('../models');

// home page route
router.get("/",(req,res)=>{

    Blog.findAll().then(blogs=>{
        const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
        const loggedIn = req.session.user ? true : false;

        res.render("home", { blogs:hbsBlogs, loggedIn, username:req.session.user?.username });
    });

});

// login route
router.get("/login",(req,res)=>{

    if(req.session.user){
        return res.redirect("/profile");
    };

    res.render("login");

});

// user profile route
router.get("/profile",(req,res)=>{

    if(!req.session.user){
        return res.redirect("/login");
    };

    User.findByPk(req.session.user.id,{
        include:[Blog]
    }).then(userData=>{
        const hbsData = userData.get({ plain: true })
        hbsData.loggedIn = req.session.user? true : false;

        res.render("profile", hbsData);
    });

});

// export
module.exports = router;