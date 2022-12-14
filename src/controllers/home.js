import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as UserServices from "../services/UserServices";
import * as ImageServices from "../services/ImageServices";
const Router = express.Router();

Router.get("/", function (req, res) {
  res.render("home/welcome", { user: req.user });
});

Router.get("/login", AuthHandler.isNotLoggedIn, function (req, res) {
  res.render("user/login");
});

Router.get("/logout", AuthHandler.isLoggedIn, UserServices.LogOut);
Router.post("/login", AuthHandler.isNotLoggedIn, UserServices.Login);

Router.get("/upload", function (req, res) {
  res.render("home/upload");
});

Router.post("/upload", ImageServices.upload.single("upload"), (req, res) => {
  res.send(req.file);
});

export default Router;
