const signIn = require("../helpers/singIn");

const userController = require("./userController");
const cookieController = {};

/**
 * setCookie - set a cookie with a random number
 */
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie("codesmith", "hi", { httpOnly: true }); //Sets codesmith = hi
  res.cookie("secret", parseInt(Math.random() * 100), { httpOnly: true });
  next();
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  let { userId, toRedirect } = req.locals;
  console.log("ssid", req.body);
  //can you pass req and res around?
  // const { token, jwtExpirySeconds } = signIn.createJWT(userId);
  // console.log("inside setSSIDCookie", token);
  let token = "12345";
  let jwtExpirySeconds = 300;
  res.cookie("ssid", token, {
    httpOnly: true,
    maxAge: jwtExpirySeconds * 1000,
  });
  // res.status(200).json(null);
  next();
};

module.exports = cookieController;
