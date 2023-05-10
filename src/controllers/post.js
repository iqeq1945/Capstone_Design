import express from "express";
import * as PostServices from "../services/PostServices";
import { upload } from "../config/s3";

const Router = express.Router();

Router.get("/", function (req, res) {
  res.render("posts/index", { post: post });
});

Router.get("/new/:novelId", function (req, res) {
  res.render("posts/new", { novelId: req.params.novelId });
});

Router.post("/new", PostServices.CreatePost, function (req, res) {
  res.render("posts/viewer", { post: req.post, content: req.content });
});

Router.get("/view/:id", PostServices.ViewPost, function (req, res) {
  res.render("posts/viewer", { post: req.post, content: req.content });
});

Router.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file);
  let url = req.file.location;
  res.json(url);
});

export default Router;
