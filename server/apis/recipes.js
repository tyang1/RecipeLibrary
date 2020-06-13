const express = require("express");
const router = express.Router();
const config = require("config");
const Profile = require("../models/profileModel");
const { check, validationResult } = require("express-validator/check");
const auth = require("../apis/auth");

//TODO, add auth here as well
router.get("/", auth, async (req, res) => {
  //   const userId = req.params.uid;
  const userId = req.user.userId;
  try {
    let profile = await Profile.find({ user: userId });
    if (!profile) {
      res.status(400).json({ msg: "No profile found" });
    } else {
      //   res.send(profile);
      res.json(JSON.stringify(profile[0].recommendedRecipes));
    }
  } catch (err) {
    res.status(500).send("server error");
  }
});

module.exports = router;
