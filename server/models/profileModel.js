const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("./recipeModel");

const recipeSchema = new Schema({
  title: {
    type: String,
  },
  readyInMinutes: {
    type: Number,
  },
  sourceUrl: {
    type: String,
  },
  image: {
    type: String,
  },
});

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  myTop3Recipes: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Recipe",
    type: [String],
  },
  newsfeed: {
    author: {
      type: String,
    },
    top3Recieps: {
      // type: [mongoose.Schema.Types.ObjectId],
      // ref: "Recipe",
      type: [String],
    },
  },
  diet: {
    nutrition: {
      type: [String],
    },
    ingredients: {
      type: [String],
    },
  },
  recommendedRecipes: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Recipe",
    type: [recipeSchema],
    // required: true,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
