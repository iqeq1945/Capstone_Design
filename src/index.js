// index.js

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import session from "express-session";
import passport from "passport";
import passportConfig from "./config/passport";
import dotenv from "dotenv";
import flash from "connect-flash";
import HomeController from "./controllers/home";
import UserController from "./controllers/user";
import NovelController from "./controllers/novel";
import PostController from "./controllers/post";
const app = express();

dotenv.config();
passportConfig(passport);

// Other settings
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

// Passport settings
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Custom Middleware
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", HomeController);
app.use("/users", UserController);
app.use("/novels", NovelController);
app.use("/posts", PostController);
// Port setting
const port = 3000;
app.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});
