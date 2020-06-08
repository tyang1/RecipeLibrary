const express = require("express");
const router = express.Router();
const request = require("request");
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
        res.json({ update: profileFields });
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

//@route GET /app/home/me/recommended_recipes
//@desc GET current users's recommended recipes
//@access Public

router.get("/recommended_recipes?diet={str1}&nutrition={str2}", (req, res) => {
  try {
    //get the food API payloads, random 3
    const options = {
      url: `https://api.spoonacular.com/recipes/search?query=${req.query.diet}${req.query.nutrition}&number=3`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      }
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "Recipe not found" });
      }
      res.json(JSON.parse(body));
    });
    //payload :{nutrition, ingredients, img}
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
