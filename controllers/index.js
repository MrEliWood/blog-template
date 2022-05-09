// import modules and packages
const express = require('express');
const router = express.Router();

// define routes
const frontEnd = require("./frontEndRoutes");
router.use("/", frontEnd);

const blogRoutes = require("./blogRoutes");
router.use("/api/blogs", blogRoutes);

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

// export
module.exports = router;