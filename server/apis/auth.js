const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get the token from the header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Token does not exist, auth denied" });
  }
  try {
    let decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
  //if token is not there then return 401
  //if token is not verified, then return 401
  //else allow to move to next();
};
