const express = require("express");
const router = express.Router();

// Load each controller
const microPostsController = require("./microPosts.js");
const authController = require("./auth.js");
const activityLogsController = require("./activityLogs.js");
const challengesController = require("./challenges.js");
const charitiesController = require("./charities.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/auth", authController);
router.use("/micro_posts", microPostsController);
router.use("/logs", activityLogsController);
router.use("/challenges", challengesController);
router.use("/charities", charitiesController);

module.exports = router;
