const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
const sessionController = require("./controllers/sessionController");

const app = express();

const mongoURI =
  "mongodb+srv://recipeUser:recipe520%21@cluster0-vgvbm.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURI);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
/**
 * Set our Express view engine as ejs.
 * This means whenever we call res.render, ejs will be used to compile the template.
 * ejs templates are located in the client/ directory
 */
app.set("view engine", "ejs");

/**
 * Automatically parse urlencoded body content from incoming requests and place it
 * in req.body
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * --- Express Routes ---
 * Express will attempt to match these routes in the order they are declared here.
 * If a route handler / middleware handles a request and sends a response without
 * calling `next()`, then none of the route handlers after that route will run!
 * This can be very useful for adding authorization to certain routes...
 */

/**
 * root
 */
app.use(cookieParser());
app.get("/", (req, res) => {
  /**
   * Since we set `ejs` to be the view engine above, `res.render` will parse the
   * template page we pass it (in this case 'client/secret.ejs') as ejs and produce
   * a string of proper HTML which will be sent to the client!
   */
  res.render("./../client/index");
});

/**
 * signup
 */
app.use(bodyParser.json());
app.get("/signup", (req, res) => {
  res.render("./../client/signup", { error: null });
});

app.post("/signup", userController.createUser);

/**
 * login
 */
app.post("/login", userController.verifyUser);

/**
 * Authorized routes
 */
// app.get(
//   "/secret",
//   //   cookieController.setCookie,
//   (req, res, next) => {
//     res.render("./../client/secret.ejs", { error: null });
//     // userController.getAllUsers((err, users) => {
//     //   res.locals.users = users;
//     //   next();
//     // });
//   }
//   //   cookieController.setSSIDCookie,
//   //   sessionController.startSession
// );

app.get("/secret", userController.getAllUsers, (err, req, res, next) => {
  let users = req.locals.users;
  res.render("./../client/secret", { users: users });
  next();
});

app.listen(3000);

module.exports = app;
