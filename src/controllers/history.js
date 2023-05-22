import express from "express";
import * as HistoryServices from "../services/HistoryServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as UserServices from "../services/UserServices";
const Router = express.Router();

Router.post(
  "/",
  AuthHandler.isLoggedIn,
  UserServices.DeleteSeed,
  HistoryServices.Create
);

Router.get("/", AuthHandler.isLoggedIn, HistoryServices.Get);

export default Router;
