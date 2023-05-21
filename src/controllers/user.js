import express from "express";
import * as UserServices from "../services/UserServices";
import * as CashService from "../services/CashServices";
import * as NovelServices from "../services/NovelServices";
import * as HistoryServices from "../services/HistoryServices";
import * as AuthHandler from "../middlewares/AuthHandler";
const Router = express.Router();

Router.get("/signup", function (req, res) {
  res.render("user/signup");
});
Router.post("/", UserServices.SingUp);

Router.get("/work", AuthHandler.isLoggedIn, NovelServices.GetMyList);

Router.get("/detail", AuthHandler.isLoggedIn, CashService.Get);

Router.get("/cash", AuthHandler.isLoggedIn, function (req, res) {
  res.render("user/cash");
});

Router.get(
  "/library",
  AuthHandler.isLoggedIn,
  HistoryServices.Get,
  function (req, res) {
    res.render("user/library", {
      data: res.history,
    });
  }
);

Router.post(
  "/cash",
  AuthHandler.isLoggedIn,
  UserServices.CreateSeed,
  CashService.Create
);

Router.post(
  "/like",
  AuthHandler.isLoggedIn,
  UserServices.LikeOnNovel,
  function (req, res) {
    res.json("좋아요 성공");
  }
);

Router.post(
  "/unlike",
  AuthHandler.isLoggedIn,
  UserServices.unLikeOnNovel,
  function (req, res) {
    res.json("좋아요 취소 성공");
  }
);
export default Router;
