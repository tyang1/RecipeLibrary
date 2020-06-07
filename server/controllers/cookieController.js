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
  //can you pass req and res around?
  const { token, jwtExpirySeconds } = signIn.createJWT(userId);
  res.json({ token });
  // res.cookie("ssid", token, {
  //   httpOnly: true,
  // maxAge: jwtExpirySeconds * 1000000,
  // });
  // res.status(200).json(null);
  // next();
};

module.exports = cookieController;
