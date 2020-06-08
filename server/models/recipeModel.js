const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
  },
  media: {
    type: String,
  },
  tags: {
    type: [String],
  },
  nutrition: {
    type: [String],
  },
  cookTime: {
    type: Number,
  },
  description: {
    type: String,
  },
});

module.exports = Recipe = mongoose.model("Recipe", recipeSchema);
