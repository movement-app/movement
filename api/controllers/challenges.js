const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Challenge } = db;
const { User } = db;
const { userchallenge } = db;

router.get("/", passport.isAuthenticated(), (req, res) => {
    User.findAll({
        where: {
            id: req.user.id,
        },
        include: [Challenge],
    }).then((allChallenges) => res.json(allChallenges));
})

router.get("/participants/:match_id", passport.isAuthenticated(), (req, res) => {
    const { match_id } = req.params;
    Challenge.findAll({
      where: {match_id: match_id},
      include: [{
        model: User, 
        through: { where: {ChallengeMatchId: match_id}},
        attributes: ['firstName'] ,
      }]
  }).then((allIds) => res.json(allIds));
})

router.post("/create", passport.isAuthenticated(), (req, res) => {
    console.log("POST body: ", req.body);
    distanceFloat = parseFloat(req.body.distance);
    donationFloat = parseFloat(req.body.donation);

    let min = 10000000;
    let max = 99999999;

    Challenge.create({
        match_id: Math.floor(Math.random() * (max - min + 1)) + min,
        title: req.body.title,
        distance: distanceFloat,
        deadline: req.body.deadline,
        donation_amount: donationFloat,
        status: true,
        CharityId: req.body.charity,
    }).then((newChallenge) => {
        newChallenge.addUser(req.user.id);
        res.status(201).json(newChallenge);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
})

router.put("/:match_id", passport.isAuthenticated(), (req, res) => {
    const { match_id } = req.params;
    Challenge.findByPk(match_id).then((challenge) => {
        if (!challenge) {
          return res.sendStatus(404);
        }
    
        challenge.addUser(req.user.id);
        res.sendStatus(204);
      });
})

module.exports = router;