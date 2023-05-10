import * as CommentRepository from "../repositories/CommentRepository";
import { dbNow } from "../utils/dayUtils";

export const Create = async (req, res, next) => {
  try {
    const data = createOption(req.body, req.user.id);
    const response = await CommentRepository.createComment(data);
    if (response) {
      res.redirect("/posts/view/" + parseInt(req.body.postId, 10));
      next();
    } else {
      res.redirect("/posts/view/" + parseInt(req.body.postId, 10));
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Get = async (req, res, next) => {
  try {
    const response = await CommentRepository.getMyComment(req.body);
    console.log(response);
    if (response) {
      req.body.comment = response;
      next();
    } else {
      req.body.comment = none;
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const GetList = async (req, res, next) => {
  try {
    const response = await CommentRepository.getListComment(
      parseInt(req.body.postId, 10)
    );
    if (response) {
      res.comment = response;
      next();
    } else {
      res.comment = none;
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createOption = (bodydata, userId) => {
  // DB data 옵션 설정.
  const dataOption = {
    userId: {
      connect: { id: parseInt(userId, 10) },
    },
    post: {
      connect: { id: parseInt(bodydata.postId, 10) },
    },
    content: bodydata.content,
    cite: bodydata.cite,
    createdAt: dbNow(),
  };

  return dataOption;
};
