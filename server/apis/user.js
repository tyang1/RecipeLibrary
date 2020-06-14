const express = require("express");
const router = express.Router();

//@route GET /app/home/me
//@desc Authenticate user, verify token, and return userID
//@access PUBLIC

module.exports = function (req, res, next) {
  //get the token from the header
  console.log("auth", req.header("x-auth-token"));
  console.log("cookies auth", req.cookies["access_token"]);
  const token = req.header("x-auth-token") || req.cookies["access_token"];
  if (!token) {
    return res.render("index");
    // return res.status(401).json({ msg: "Token does not exist, auth denied" });
  }
  try {
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
  //if token is not there then return 401
  //if token is not verified, then return 401
  //else allow to move to next();
};
