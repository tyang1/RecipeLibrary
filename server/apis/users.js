const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");

router.post("/signup", (req, res) => {
  //see if the user already exists
  //encrypt save the password
  //optional: grab the users' gravatar
  //have them loggined in right away by sending the jwttoken
  console.log(req.body);

  res.send("User route");
});

module.exports = router;
