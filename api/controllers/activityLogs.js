const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { ActivityLog } = db;

router.get("/",(req, res) => {
    ActivityLog.findAll({
        where: {
            userId: req.user.id
        }
    }).then((allLogs) => res.json(allLogs));
}) 

router.post("/", passport.isAuthenticated(), (req, res) => {
    console.log("POST body: ", req.body);
    ActivityLog.create({
        description: req.body.description,
        distance: req.body.distance,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        date: req.body.date
    })
      .then((newLog) => {
        res.status(201).json(newLog);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
})

module.exports = router;