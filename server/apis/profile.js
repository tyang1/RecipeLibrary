const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");
const config = require("config");
const Profile = require("../models/profileModel");
const auth = require("../apis/auth");
const { check, validationResult } = require("express-validator/check");

async function createProfileFields(userId, req = {}) {
  const profileFields = {};
  profileFields.user = userId;
  let nu = "balanced",
    ing = "healthy";
  if (req.body) {
    const { myTop3Recipes, newsfeed, diet } = req.body;
    const { nutrition, ingredients } = diet;
    nu = nutrition;
    ing = ingredients;
    if (myTop3Recipes) {
      profileFields.myTop3Recipes = myTop3Recipes
        .split(",")
        .map((each) => each.trim());
    }
    if (newsfeed) profileFields.newsfeed = newsfeed;
    if (diet) profileFields.diet = diet;
  } else {
    //create the profile with user and recommendedrecipes, return profile
  }
  try {
    const results = await axios
      .get(
        `https://api.spoonacular.com/recipes/search?apiKey=${config.get(
          "foodAPIKey"
        )}&query=${ing}%20${nu}&number=3`
      )
      .then((response) => {
        return response.data.results;
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          throw Error(err);
        } else if (err.request) {
          throw Error(err);
        }
      });
    profileFields.recommendedRecipes = results;
  } catch (err) {
    console.log("err", err);
  }
  return profileFields;
}

//@route GET /app/home/me
//@desc GET current users's profile
//@access Private
// router.get("/", auth, async (req, res) => {
router.get("/", auth, async (req, res) => {
  try {
    // res.sendFile("index.html", { root: path.join(__dirname, "../../public") });
    //TODO: restore the following:
    let { userId } = req.user;
    let profile = await Profile.findOne({ user: userId });
    if (profile) {
      res.status(200).send(profile);
    } else {
      const profileFields = await createProfileFields(userId, {});
      //create profile
      profile = new Profile(profileFields);
      await profile.save();
      return res.json({ profile });
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@route POST /app/home/me
//@desc CREATE/UPDATE current users's profile
//@access Private

router.post(
  "/",
  [auth, check("diet", "diet is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { userId } = req.user;
      const profileFields = await createProfileFields(userId, req);
      //check to see if profile exists:
      let profile = await Profile.findOne({ user: userId });

      await Profile.findOneAndUpdate(
        { user: userId },
        { $set: profileFields },
        { new: true }
      );
      return res.json({ profile });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
