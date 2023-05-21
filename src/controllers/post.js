import express from "express";
import * as PostServices from "../services/PostServices";
import * as HistoryServices from "../services/HistoryServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import { upload } from "../config/s3";

const Router = express.Router();

Router.get("/", AuthHandler.isLoggedIn, function (req, res) {
  res.render("posts/index", { post: post });
});

Router.get("/new/:novelId", AuthHandler.isLoggedIn, function (req, res) {
  res.render("posts/new", { novelId: req.params.novelId });
});

Router.post(
  "/new",
  AuthHandler.isLoggedIn,
  PostServices.CreatePost,
  function (req, res) {
    res.render("novels/detail/" + req.novelId, {
      post: req.post,
      content: req.content,
    });
  }
);

Router.get(
  "/update/:id",
  AuthHandler.isLoggedIn,
  PostServices.ViewPost,
  function (req, res) {
    res.render("posts/update", {
      post: req.post,
      data: req.content,
    });
  }
);

Router.put(
  "/update/:id",
  AuthHandler.isLoggedIn,
  PostServices.UpdatePost,
  function (req, res) {
    res.redirect("/novels/detail/" + req.body.novelId);
  }
);

Router.get(
  "/view/:id",
  AuthHandler.isLoggedIn,
  PostServices.ViewPost,
  function (req, res) {
    res.render("posts/viewer", { post: req.post, content: req.content });
  }
);

Router.get(
  "/view/author/:id",
  AuthHandler.isLoggedIn,
  PostServices.ViewPost,
  function (req, res) {
    res.render("posts/viewer_author", { post: req.post, content: req.content });
  }
);

Router.post(
  "/upload",
  AuthHandler.isLoggedIn,
  upload.single("file"),
  function (req, res) {
    console.log(req.file);
    let url = req.file.location;
    res.json(url);
  }
);

Router.get(
  "/next/:postId/:novelId/:take",
  AuthHandler.isLoggedIn,
  PostServices.MovePage,
  HistoryServices.CheckMyHistory
);

export default Router;
