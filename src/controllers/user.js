import express from "express";
import * as UserServices from "../services/UserServices";

const Router = express.Router();

Router.get("/signup", function (req, res) {
  res.render("user/signup");
});

Router.post("/", UserServices.SingUp, function (req, res) {
  console.log(res.data);
  res.render("user/signup");
});

Router.get("/", function (req, res) {
  res.render("user/profile", { user: req.user });
});

export default Router;
