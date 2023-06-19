import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as UserServices from "../services/UserServices";
import * as NovelServices from "../services/NovelServices";
import * as ImageServices from "../services/ImageServices";
import * as AuthValidation from "../validation/AuthValidation";

const Router = express.Router();

Router.get("/", NovelServices.GetListWithLike, function (req, res) {
  res.render("home/welcome", { user: req.user, novel: res.data });
});

Router.get("/login", AuthHandler.isNotLoggedIn, function (req, res) {
  res.render("user/login");
});

Router.get("/logout", AuthHandler.isLoggedIn, UserServices.LogOut);
Router.post(
  "/login",
  AuthHandler.isNotLoggedIn,
  AuthValidation.LoginRequestValid,
  UserServices.Login
);

Router.get("/upload", function (req, res) {
  res.render("home/upload");
});

Router.post("/upload", ImageServices.upload.single("upload"), (req, res) => {
  res.send(req.file);
});

Router.get("/session", function (req, res) {
  res.send(req.session);
});
export default Router;
