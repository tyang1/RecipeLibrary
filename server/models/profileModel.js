const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("./recipeModel");

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
    type: [String],
  },
  recommendedRecipes: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Recipe",
    type: [String],
    required: true,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
