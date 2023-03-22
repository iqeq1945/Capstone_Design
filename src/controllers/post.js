import express from "express";

const Router = express.Router();

Router.get("/", function (req, res) {
  res.render("posts/index", { post: post });
});

Router.get("/new", function (req, res) {
  res.render("posts/new");
});

export default Router;
