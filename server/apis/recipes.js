const express = require("express");
const router = express.Router();
const config = require("config");
const Profile = require("../models/profileModel");
const { check, validationResult } = require("express-validator/check");
const auth = require("../apis/auth");

//@route GET /app/home/me/recipes
//@desc GET recommended recipes
//@access PRIVATE

//TODO, add auth here as well
router.get("/", auth, async (req, res) => {
  const userId = req.user.userId;
  console.log("inside get recipes", userId);
  //   const userId = req.params.uid;
  try {
    let profile = await Profile.find({ user: userId });
    console.log("recipes: profile", profile);
    if (!profile || !profile.length) {
      res.status(400).json({ msg: "No profile found" });
    } else {
      //   res.send(profile);
      res.json(profile[0].recommendedRecipes);
    }
  } catch (err) {
    res.status(500).send("server error", err);
  }
});

module.exports = router;
