const configs = require("config");

const jwt = require("jsonwebtoken");
const jwtExpirySeconds = 3000000000;
const jwtKey = configs.get("jwtKey");

const signIn = {
  createJWT(userId) {
    //get credential from JSON body
    //create the jwt token, and return
    const token = jwt.sign({ userId }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });
    return { token, jwtExpirySeconds };
  },
  verifyJWT(token) {
    console.log("here is verifyJWT", token);
    if (!token) {
      return new Error("no cookies found");
    }
    let payload;
    try {
      payload = jwt.verify(token, jwtKey);
      return true;
    } catch (e) {
      return new Error("the ssid/token does not match");
    }
  },
};

module.exports = signIn;
