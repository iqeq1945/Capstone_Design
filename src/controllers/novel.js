import express from "express";
import * as NovelServices from "../services/NovelServices";
const Router = express.Router();

Router.get("/", function (req, res) {
  res.render("novels/new");
});

Router.post("/", NovelServices.Create);
export default Router;
