const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("config");
const auth = require("./apis/auth");

const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
const sessionController = require("./controllers/sessionController");

const signIn = require("./helpers/singIn");
const profile = require("./apis/profile");

const app = express();

const mongoURI = config.get("mongoURI");

mongoose.connect(mongoURI);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/**
 * Set our Express view engine as ejs.
 * This means whenever we call res.render, ejs will be used to compile the template.
 * ejs templates are located in the client/ directory
 * Init middlewares
 */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../client"));
app.use("/app/home/me", express.static("public"));
app.use("/app/home/me", profile);

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
app.get("/", auth, (req, res) => {
  /**
   * Since we set `ejs` to be the view engine above, `res.render` will parse the
   * template page we pass it (in this case 'client/secret.ejs') as ejs and produce
   * a string of proper HTML which will be sent to the client!
   */
  res.redirect("/app/home/me");
});

/**
 * signup
 */
app.get("/signup", (req, res) => {
  // let isError = !!req.session;
  // let err = isError ? req.session.error : null;
  res.render("signup", { error: null });
  // if (isError) delete req.session.error;
});

app.post(
  "/signup",
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.redirect("/app/home/me");
  }
  // sessionController.startSession
);

/**
 * login
 */
app.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  // sessionController.isLoggedIn,
  (req, res) => {
    res.sendFile("index.html", { root: "./public" });
  }
);

/**
 * Authorized routes
 */

app.listen(3000);

module.exports = app;
