import express from "express";
import * as UserServices from "../services/UserServices";

const Router = express.Router();

Router.get("/signup", function (req, res) {
  res.render("home/signup");
});

Router.post("/", UserServices.SingUp, function (req, res) {
  console.log(res.data);
  res.render("home/signup");
});

Router.get("/", function (req, res) {
  console.log(req.user);
});

export default Router;
