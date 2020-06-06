const Session = require("../models/sessionModel");

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  // if user is logged in, then check for cookie
  if (!req.cookies) {
    res.redirect("/login");
  } else {
    const cookieId = req.cookies;
    Session.findOne(
      {
        cookieId,
      },
      (err, session) => {
        if (!err || session) {
          next();
        } else {
          const newSession = new Session({
            cookieId,
          });
          newSession.save((err) => {
            if (err) {
              throw new Error(err);
            } else {
              console.log("session ID successfully created!");
            }
          });
        }
      }
    );
  }
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  const { userId, toRedirect } = req.locals;
  const newSession = new Session({
    cookieId: userId,
  });
  newSession.save((err) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log("session ID successfully created!");
    }
  });
  toRedirect();
  //write code here
};

module.exports = sessionController;
