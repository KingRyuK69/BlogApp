const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const articleRoutes = require("./articleRoute");
const empRoutes = require("./empRoute");

router.use(userRoutes);
router.use(articleRoutes);
router.use(empRoutes);

module.exports = router;
