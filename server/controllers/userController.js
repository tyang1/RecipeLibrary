const User = require("../models/userModel");

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) {
      //   return next(
      //     "Error in userController.getAllUsers: " + JSON.stringify(err)
      //   );
      res.redirect("/signup");
    }
    // store retrieved users into res.locals and move on to next middleware
    req.locals = { users: users };
    next();
  });
};

const getUserId = (req, res, userId, next) => {
  req.locals = {
    userId,
    toRedirect: () => res.redirect("/app/home"),
  };
  next();
};

const verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err || !user) {
      res.redirect("/signup");
    } else if (user.password === req.body.password) {
      // res.redirect("/secret");
      getUserId(req, res, user._id, next);
    }
  });
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      // req.session = {};
      // req.session.error = "Incorrect username or password";
      res.render("signup", { error: err });
      // throw new Error(err);
    } else {
      //redirect to '/secret' route
      // res.redirect("/secret");
      verifyUser(req, res, next);
    }
  });
  // write code here
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  verifyUser(req, res, next);
  // write code here
};

module.exports = userController;
