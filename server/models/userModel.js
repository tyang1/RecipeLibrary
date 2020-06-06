const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Hint: Why is bcrypt required here?
 */
const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  let user = this;
  console.log("user paswrd", user);
  // return new Promise((resolve, reject) => {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
