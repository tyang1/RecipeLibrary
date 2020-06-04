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
  // let { userId, toRedirect } = userController.getUserId();
  let { userId, toRedirect } = req.locals;
  res.cookie("ssid", userId, { httpOnly: true });
  toRedirect();
};

module.exports = cookieController;
