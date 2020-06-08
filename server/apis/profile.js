const express = require("express");
const router = express.Router();
const auth = require("../apis/auth");

//@route GET /app/home/me
//@desc GET current users's profile
//@access Private
router.get("/", auth, (req, res) => {
  //we want to get 
});

module.exports = router;
