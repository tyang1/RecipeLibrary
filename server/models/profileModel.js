const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("./recipeModel");

const profileSchema = new Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  myTop3Recipes: {
    type: [Recipe],
  },
  newsfeed: {
    author: {
      type: String,
    },
    top3Recieps: {
      type: [Recipe],
    },
  },
  diet: {
    type: [String],
  },
  recommendedRecipes: {
    type: [Recipe],
  },
});
