const Session = require("../models/sessionModel");

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  const { cookieId } = req.body;
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
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  const { userId } = req.body;
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
  //write code here
};

module.exports = sessionController;
