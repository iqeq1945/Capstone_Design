import express from "express";
import * as NovelServices from "../services/NovelServices";
import { upload } from "../config/s3";
import * as ImageServices from "../services/ImageServices";
const Router = express.Router();

Router.get("/:id", function (req, res) {
  res.render("novels/index");
});

Router.get("/", function (req, res) {
  res.render("novels/new");
});

Router.post("/", upload.single("upload"), NovelServices.CreateNovel);

Router.put(
  "/",
  ImageServices.upload.single("upload"),
  NovelServices.UpdateNovel
);
Router.get("/update/:id", NovelServices.GetInfo);

Router.get("/category", NovelServices.GetList);
Router.get("/category/:category", NovelServices.GetList);
Router.post("/category", NovelServices.Search);

Router.get("/delete/:novelId", NovelServices.DeleteNovel);

Router.get("/viewer", function (req, res) {
  res.render("novels/viewer");
});
export default Router;
