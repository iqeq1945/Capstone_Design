import * as HistoryRepository from "../repositories/HistroyRepository";
import { dbNow } from "../utils/dayUtils";

export const Create = async (req, res, next) => {
  try {
    const data = createOption(req.body, req.user.id);
    const response = await HistoryRepository.createHistory(data);
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

    if (response) {
      res.history = response;
      next();
    } else {
      res.history = none;
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const CheckMyHistory = async (req, res, next) => {
  try {
    const response = await HistoryRepository.getMyHistoryByPost(
      req.user.id,
      res.data[0].id
    );
    if (response && response.length > 0) {
      res.json[1] = 1;
      res.json(res.data);
    } else {
      res.data[1] = 0;
      res.json(res.data);
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
    novel: {
      connect: { id: parseInt(bodydata.novelId, 10) },
    },
    createdAt: dbNow(),
  };

  return dataOption;
};
