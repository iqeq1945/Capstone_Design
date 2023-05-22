import express from "express";
import * as NovelServices from "../services/NovelServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import { upload } from "../config/s3";
import * as ImageServices from "../services/ImageServices";
import * as NovelValidation from "../validation/NovelValidation";

const Router = express.Router();

Router.get(
  "/:id",
  AuthHandler.isLoggedIn,
  NovelServices.GetInfo,
  function (req, res, next) {
    res.render("novels/index", { novel: req.novel });
  }
);

Router.get(
  "/detail/:id",
  AuthHandler.isLoggedIn,
  NovelServices.GetInfo,
  function (req, res, next) {
    res.render("novels/detail", { novel: req.novel });
  }
);

Router.get("/", AuthHandler.isLoggedIn, function (req, res) {
  res.render("novels/new");
});

Router.post(
  "/",
  AuthHandler.isLoggedIn,
  NovelValidation.CreateRequestValid,
  upload.single("upload"),
  NovelServices.CreateNovel
);

Router.get(
  "/update/:id",
  AuthHandler.isLoggedIn,
  NovelServices.GetInfo,
  function (req, res, next) {
    res.render("novels/update", { data: req.novel });
  }
);

Router.put(
  "/update/:id",
  AuthHandler.isLoggedIn,
  NovelValidation.UpdateRequestValid,
  upload.single("upload"),
  NovelServices.UpdateNovel
);

Router.put(
  "/",
  AuthHandler.isLoggedIn,
  ImageServices.upload.single("upload"),
  NovelServices.UpdateNovel
);

Router.get("/category", AuthHandler.isLoggedIn, NovelServices.GetList);
Router.get(
  "/category/:category",
  AuthHandler.isLoggedIn,
  NovelServices.GetList
);
Router.post("/category", AuthHandler.isLoggedIn, NovelServices.Search);

Router.get(
  "/delete/:novelId",
  AuthHandler.isLoggedIn,
  NovelServices.DeleteNovel
);

Router.get("/viewer", AuthHandler.isLoggedIn, function (req, res) {
  res.render("novels/viewer");
});
export default Router;
