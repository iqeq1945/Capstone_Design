import express from "express";
import * as ImageServices from "../services/ImageServices";
import { upload } from "../config/s3";

const Router = express.Router();

Router.get("/", function (req, res) {
  res.render("posts/index", { post: post });
});

Router.get("/new", function (req, res) {
  res.render("posts/new");
});

Router.post("/new", upload.single("upload"), function (req, res) {
  res.send(req.body, res.data);
});

Router.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file);
  let url = req.file.location;
  res.json(url);
});
