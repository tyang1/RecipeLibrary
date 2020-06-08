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
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// let pwdCompare = async (plainpwdtext, hash) => {
//   try {
//     const res = await bcrypt.compare(plainpwdtext, hash);
//     return res;
//   } catch (err) {
//     return new Error(err.message);
//   }
// };

module.exports = User = mongoose.model("User", userSchema);
