const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Charity } = db;

router.post("/", passport.isAuthenticated(), (req, res) => {
    Charity.create({
        name: req.body.name,
        category: req.body.category,
        link: req.body.link,
    })
    .then((newCharity) => {
        res.status(201).json(newCharity);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
})

module.exports = router;