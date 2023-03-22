import * as HistoryRepository from "../repositories/HistoryRepository";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";

export const Create = async (req, res, next) => {
  try {
    const response = await HistoryRepository.create(req.body);
    console.log(response);
    if (response) {
      return res.send("성공");
    } else {
      return res.send("실패");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Get = async (req, res, next) => {
  try {
    const response = await HistoryRepository.getMyHistory(req.body);
    console.log(response);
    if (response) {
      req.body.history = response;
      next();
    } else {
      req.body.history = none;
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
