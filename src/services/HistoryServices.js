import * as HistoryRepository from "../repositories/HistroyRepository";
import { dbNow } from "../utils/dayUtils";

export const Create = async (req, res, next) => {
  try {
    const data = createOption(req.body, req.user.id);
    const response = await HistoryRepository.createHistory(data);
    console.log(data.postId);
    if (response) {
      res.redirect("/posts/view/" + parseInt(req.body.postId, 10));
      next();
    } else {
      res.redirect("/novels/" + parseInt(req.body.novelId, 10));
      next();
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

const createOption = (bodydata, buyerId) => {
  // DB data 옵션 설정.
  const dataOption = {
    buyer: {
      connect: { id: parseInt(buyerId, 10) },
    },
    post: {
      connect: { id: parseInt(bodydata.postId, 10) },
    },
    createdAt: dbNow(),
  };

  return dataOption;
};
