// import modules and packages
const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

// GET all comments
router.get("/", (req, res) => {

    Comment.findAll({
            include: [User, Blog]
        })
        .then(dbComments => {
            res.json(dbComments);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// GET one comment
router.get("/:id", (req, res) => {

    Comment.findByPk(req.params.id, {
            include: [User, Blog]
        })
        .then(dbComment => {
            res.json(dbComment);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// POST new comment
router.post("/", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    };

    Comment.create({
        body: req.body.body,
        UserId: req.session.user.id,
        BlogId: req.body.blog.id
        })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// PUT comment update
router.put("/:id", (req, res) => {

    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
        })
        .then(updatedComment => {
            res.json(updatedComment);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// DELETE a comment
router.delete("/:id", (req, res) => {

    Comment.destroy({
        where: {
            id: req.params.id
        }
        })
        .then(deletedComment => {
            res.json(deletedComment);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// export
module.exports = router;