import express from "express";
import * as UserServices from "../services/UserServices";
import * as CashService from "../services/CashServices";
import * as NovelServices from "../services/NovelServices";
const Router = express.Router();

Router.get("/signup", function (req, res) {
  res.render("user/signup");
});
Router.post("/", UserServices.SingUp);

Router.get("/work", NovelServices.GetMyList);

Router.get("/myjandy", function (req, res) {
  res.render("user/myjandy");
});

Router.get("/detail", CashService.Get);

Router.get("/cash", function (req, res) {
  res.render("user/cash");
});

Router.post("/cash", UserServices.CreateSeed, CashService.Create);
export default Router;
