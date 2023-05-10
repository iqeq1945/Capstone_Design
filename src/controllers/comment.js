import express from "express";
import * as HistoryServices from "../services/HistoryServices";
import * as UserServices from "../services/UserServices";
import * as CommentServices from "../services/CommentServices";
const Router = express.Router();

Router.post("/", CommentServices.Create);
Router.get("/:postId", CommentServices.GetList);

export default Router;
