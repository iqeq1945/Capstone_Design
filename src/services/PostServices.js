import * as PostRepository from "../repositories/PostRepository";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";

export const CreatePost = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.novelId) {
      res.data = resFormat.fail(403, "소절 정보가 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.authorId) {
      res.data = resFormat.fail(403, "작가의 정보가 입력되지 않았습니다.");
      return res.send(res.data.message);
    }

    let data = req.body;
    data.createdAt = dbNow();

    const response = await PostRepository.createPost(data);
    if (response) {
      return res.send(response);
    } else {
      return res.send("실패");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdatePost = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.novelId) {
      res.data = resFormat.fail(403, "소절 정보가 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.authorId) {
      res.data = resFormat.fail(403, "작가의 정보가 입력되지 않았습니다.");
      return res.send(res.data.message);
    }

    const response = await PostRepository.updatePost(data);
    if (response) {
      return res.send(response);
    } else {
      return res.send("실패");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const DeletePost = async (req, res, next) => {
  try {
    if (req.user.id != req.body.author) {
      return res.send("작가의 정보가 옳지 않음");
    }
    const response = await PostRepository.deletePost(req.body.id);
    if (response) {
      return res.send("삭제 성공");
    } else {
      return res.redirect("삭제 실패");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
