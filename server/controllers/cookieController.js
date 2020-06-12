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
  let { userId } = req.locals;
  //can you pass req and res around?
  const { token } = signIn.createJWT(userId);
  res.set("x-auth-token", token);
  next();
  // res.json({ token });
};

module.exports = cookieController;
