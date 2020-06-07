const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
const sessionController = require("./controllers/sessionController");

const signIn = require("./helpers/singIn");

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
 * Init middlewares
 */
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../client"));
app.use("/app", express.static("public"));
app.get("/app/home", sessionController.isLoggedIn, (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});
// app.use(express.json({ extended: false }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

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
app.get(
  "/",
  // userController.getAllUsers,
  // cookieController.setCookie,
  (req, res) => {
    /**
     * Since we set `ejs` to be the view engine above, `res.render` will parse the
     * template page we pass it (in this case 'client/secret.ejs') as ejs and produce
     * a string of proper HTML which will be sent to the client!
     */
    res.render("index");
  }
);

/**
 * signup
 */
app.get("/signup", (req, res) => {
  let isError = !!req.session;
  let err = isError ? req.session.error : null;
  res.render("signup", { error: err });
  if (isError) delete req.session.error;
});

app.post(
  "/signup",
  userController.createUser,
  cookieController.setSSIDCookie
  // sessionController.startSession
);

/**
 * login
 */
app.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  (req, res) => {
    res.sendFile("index.html", { root: "./public" });
  }
);

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
  res.render("secret", { users: users });
  next();
});

app.listen(3000);

module.exports = app;
