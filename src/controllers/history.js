import express from "express";
import * as HistoryServices from "../services/HistoryServices";

const Router = express.Router();

Router.post("/", HistoryServices.Create);

Router.get("/", HistoryServices.Get);

export default Router;
