const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("./recipeModel");

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  myTop3Recipes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Recipe",
  },
  newsfeed: {
    author: {
      type: String,
    },
    top3Recieps: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Recipe",
    },
  },
  diet: {
    type: [String],
  },
  recommendedRecipes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Recipe",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
