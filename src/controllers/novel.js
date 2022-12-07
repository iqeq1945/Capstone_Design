import express from "express";
import * as NovelServices from "../services/NovelServices";
const Router = express.Router();

Router.get("/index", function (req, res) {
  res.render("novels/index");
});

Router.get("/", function (req, res) {
  res.render("novels/new");
});

Router.get("/category", function (req, res) {
  res.render("novels/category");
});
Router.get("/run", function (req, res) {
  res.render("novels/run");
});
Router.post("/", NovelServices.CreateNovel);
export default Router;
