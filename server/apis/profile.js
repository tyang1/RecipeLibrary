const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require("request");
const config = require("config");
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

//@route POST /app/home/me/recommended_recipes
//@desc CREATE current users's recommended recipes
//@access Public

// router.post("/recommended_recipes/", async (req, res) => {
//   const { ingredients = "healthy", nutrition = "balanced" } = req.body;
//   const { userId } = req.param;
//   try {
//     //get the food API payloads, random 3
//     // const options = {
//     //   url: `https://api.spoonacular.com/recipes/search?apiKey=${config.get(
//     //     "foodAPIKey"
//     //   )}&query=${ingredients}%20${nutrition}&number=3`,
//     //   method: "GET",
//     //   headers: { "Content-Type": "application/json" },
//     // };
//     return await axios
//       .get(
//         `https://api.spoonacular.com/recipes/search?apiKey=${config.get(
//           "foodAPIKey"
//         )}&query=${ingredients}%20${nutrition}&number=3`
//       )
//       .then((response) => {
//         // console.log("response", JSON.stringify(response));
//         console.log(response.data);
//         res.json({ data: JSON.parse(JSON.stringify(response.data.results)) });
//         // return {
//         //   data: JSON.parse(JSON.stringify(response.data.results)),
//         // };
//       });
//     // (err, response, body) => {
//     //   if (err) {
//     //     console.error(err);
//     //     res.statusCode(response.error).json({ error: err });
//     //   }
//     //   if (response.statusCode !== 200) {
//     //     res.status(404).json({ msg: "Recipe not found" });
//     //   }

//     // return recipes;
//     //   res.status(200).json({ data: recipes });
//     // });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

//@route POST /app/home
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
      //init profileFields
      const profileFields = {};
      const { user, myTop3Recipes, newsfeed, diet } = req.body;
      const { nutrition, ingredients } = diet;

      let { userId } = req.user;
      profileFields.user = userId;
      if (myTop3Recipes) {
        profileFields.myTop3Recipes = myTop3Recipes
          .split(",")
          .map((each) => each.trim());
      }
      if (newsfeed) profileFields.newsfeed = newsfeed;
      if (diet) profileFields.diet = diet;
      try {
        const results = await axios
          .get(
            `https://api.spoonacular.com/recipes/search?apiKey=${config.get(
              "foodAPIKey"
            )}&query=${ingredients}%20${nutrition}&number=3`
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
      //check to see if profile exists:
      let profile = await Profile.findOne({ user: userId });
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: userId },
          { $set: profileFields },
          { new: true }
        );
        return res.json({ profile });
      } else {
        //create profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.json({ profile });
      }
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
