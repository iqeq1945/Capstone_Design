import express from "express";
import * as UserServices from "../services/UserServices";

const Router = express.Router();

Router.get("/signup", function (req, res) {
  res.render("user/signup");
});
Router.post("/", UserServices.SingUp);

Router.get("/", function (req, res) {
  res.render("user/profile", { user: req.user });
});

Router.get("/myjandy", function (req, res) {
  res.render("user/myjandy");
});

Router.get("/history", function (req, res) {
  res.render("user/history");
});
export default Router;
