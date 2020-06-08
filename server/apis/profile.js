const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");
const auth = require("../apis/auth");
const { check, validationResult } = require("express-validator/check");

//@route GET /app/home
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
});

//@route POST /app/home
//@desc CREATE/UPDATE current users's profile
//@access Private

router.post(
  "/",
  [
    auth,
    check("diet", "diet is required").not().isEmpty(),
    check("recommendedRecipes", "Recommended recipes are required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      //init profileFields
      const profileFields = {};
      const {
        user,
        myTop3Recipes,
        newsfeed,
        diet,
        recommendedRecipes,
      } = req.body;

      let { userId } = req.user;
      profileFields.user = userId;
      if (myTop3Recipes) {
        profileFields.myTop3Recipes = myTop3Recipes
          .split(",")
          .map((each) => each.trim());
      }
      if (newsfeed) profileFields.newsfeed = newsfeed;
      if (diet) profileFields.diet = diet;
      if (recommendedRecipes)
        profileFields.recommendedRecipes = recommendedRecipes;
      //check to see if profile exists:
      let profile = await Profile.findOne({ user: userId });
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: userId },
          { $set: profileFields },
          { new: true }
        );
        res.json({ update: profile });
      } else {
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
        //create profile
      }
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
