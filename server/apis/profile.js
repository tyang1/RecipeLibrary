const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");
const auth = require("../apis/auth");

//@route GET /app/home/me
//@desc GET current users's profile
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let { userId } = req.user;
    let profile = await Profile.findOne({ user: userId }).populate("user");
    console.log("req.user", profile);
    if (!profile) {
      res.status(400).json({ msg: "No profile found" });
    } else {
      res.send(profile);
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
  //we want to get
});

module.exports = router;
