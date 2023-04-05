import * as CashRepository from "../repositories/CashRepository";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";
import { GetMyList } from "./NovelServices";

export const Create = async (req, res, next) => {
  try {
    const response = await CashRepository.createCash(
      createOption(req.user.id, parseInt(req.body.seed, 10))
    );

    if (response) {
      res.redirect("/users/cash");
    } else {
      res.redirect("/users/cash");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Get = async (req, res, next) => {
  try {
    const response = await CashRepository.getMyCash(req.user.id);

    if (response) {
      res.render("user/detail", { data: response });
    } else {
      res.redirect("/users/cash");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createOption = (buyerId, seed) => {
  // DB data 옵션 설정.
  const dataOption = {
    buyer: {
      connect: { id: buyerId },
    },
    createdAt: dbNow(),
    seed: seed / 100,
  };

  return dataOption;
};
