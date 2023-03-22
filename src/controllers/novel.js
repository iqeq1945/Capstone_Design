import express from "express";
import * as NovelServices from "../services/NovelServices";
import * as ImageServices from "../services/ImageServices";
const Router = express.Router();

Router.get("/:id", function (req, res) {
  res.render("novels/index");
});

Router.get("/", function (req, res) {
  res.render("novels/new");
});

Router.post(
  "/",
  ImageServices.upload.single("upload"),
  NovelServices.CreateNovel
);

Router.patch("/", NovelServices.UpdateNovel);

Router.get("/category", NovelServices.GetList);
Router.get("/category/:category", NovelServices.GetList);
Router.post("/category", NovelServices.Search);
export default Router;
