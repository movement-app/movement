const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { ActivityLog } = db;

router.get("/",(req, res) => {
    ActivityLog.findAll({
        where: {
            user_id: req.user.id
        }
    }).then((allLogs) => res.json(allLogs));
}) 

router.post("/", passport.isAuthenticated(), (req, res) => {
    console.log("POST body: ", req.body);
    distanceFloat = parseFloat(req.body.distance);
    //startTime = new Date(req.body.startTime);
    //endTime = new Date(req.body.endTime);
    dateObj = new Date(req.body.date);
    user_id = parseInt(req.body.userId);

    ActivityLog.create({
        description: req.body.description,
        distance: distanceFloat,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        date: dateObj,
    })
      .then((newLog) => {
        res.status(201).json(newLog);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
})

module.exports = router;