import express from "express";
import * as NovelServices from "../services/NovelServices";
const Router = express.Router();

Router.get("/", function (req, res) {
  res.render("novels/new");
});

Router.get("/run", function (req, res) {
  res.render("novels/run");
});
Router.post("/", NovelServices.CreateNovel);
export default Router;
