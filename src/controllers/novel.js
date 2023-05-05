import express from "express";
import * as NovelServices from "../services/NovelServices";
import { upload } from "../config/s3";
import * as ImageServices from "../services/ImageServices";
const Router = express.Router();

Router.get("/:id", NovelServices.GetInfo, function (req, res, next) {
  console.log(req.novel);
  res.render("novels/index", { novel: req.novel });
});

Router.get("/", function (req, res) {
  res.render("novels/new");
});

Router.post("/", upload.single("upload"), NovelServices.CreateNovel);

Router.get("/update/:id", NovelServices.GetInfo, function (req, res, next) {
  res.render("novels/update", { data: req.novel });
});

Router.put("/update/:id", function (req, res) {
  res.send(req.body);
});
Router.put(
  "/",
  ImageServices.upload.single("upload"),
  NovelServices.UpdateNovel
);

Router.get("/category", NovelServices.GetList);
Router.get("/category/:category", NovelServices.GetList);
Router.post("/category", NovelServices.Search);

Router.get("/delete/:novelId", NovelServices.DeleteNovel);

Router.get("/viewer", function (req, res) {
  res.render("novels/viewer");
});
export default Router;
