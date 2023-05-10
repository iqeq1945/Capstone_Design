import express from "express";
import * as HistoryServices from "../services/HistoryServices";
import * as UserServices from "../services/UserServices";
const Router = express.Router();

Router.post("/", UserServices.DeleteSeed, HistoryServices.Create);

Router.get("/", HistoryServices.Get);

export default Router;
