const express = require("express");
const router = express.Router();
const config = require("config");
const Profile = require("../models/profileModel");
const { check, validationResult } = require("express-validator/check");

//TODO, add auth here as well
router.get("/:uid", async (req, res) => {
  const userId = req.params.uid;
  try {
    let profile = await Profile.find({ user: userId });
    if (!profile) {
      res.status(400).json({ msg: "No profile found" });
    } else {
      //   res.json(JSON.stringify(profile));
      res.send(profile);
    }
  } catch (err) {
    res.status(500).send("server error");
  }
});

module.exports = router;
