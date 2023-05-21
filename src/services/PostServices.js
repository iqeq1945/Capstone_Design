import * as PostRepository from "../repositories/PostRepository";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";
import edjsHTML from "editorjs-html";

export const CreatePost = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.novelId) {
      res.data = resFormat.fail(403, "소절 정보가 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.authorId) {
      res.data = resFormat.fail(403, "작가의 정보가 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.send(res.data.message);
    }

    let data = createOption(req.body);

    const response = await PostRepository.createPost(data);
    const edjsParser = edjsHTML();
    const content = edjsParser.parse(response.content);

    if (response) {
      req.novelId = req.body.novelId;
      req.post = response;
      req.content = content;
      next();
    } else {
      res.redirect("/posts/new/" + req.body.novelId);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdatePost = async (req, res, next) => {
  try {
    if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.send(res.data.message);
    } else if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.send(res.data.message);
    }

    const check = await PostRepository.findById(parseInt(req.body.postId, 10));

    if (check.authorId != req.user.id) {
      return res.fail(403, "잘못된 접근입니다.");
    }
    const data = updateOption(req.body);
    const response = await PostRepository.updatePost(
      data,
      parseInt(req.body.postId, 10)
    );
    if (response) {
      res.data = response;
      next();
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
    if (req.user.id != req.body.authorId) {
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

export const ViewPost = async (req, res, next) => {
  try {
    const response = await PostRepository.findById(parseInt(req.params.id, 10));
    const edjsParser = edjsHTML();
    const content = edjsParser.parse(response.content);

    if (response) {
      req.post = response;
      req.content = content;
      next();
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const MovePage = async (req, res, next) => {
  try {
    const response = await PostRepository.findNextById(
      parseInt(req.params.postId, 10),
      parseInt(req.params.novelId, 10),
      parseInt(req.params.take, 10)
    );
    if (response && response.length > 0) {
      res.data = response;
      next();
    } else {
      res.json(-1);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createOption = (bodydata) => {
  // DB data 옵션 설정.
  const dataOption = {
    title: bodydata.title,
    content: JSON.parse(bodydata.content),
    author: {
      connect: { id: parseInt(bodydata.authorId, 10) },
    },
    novel: {
      connect: { id: parseInt(bodydata.novelId, 10) },
    },
    createdAt: dbNow(),
    updatedAt: dbNow(),
  };

  return dataOption;
};

const updateOption = (bodydata) => {
  // DB data 옵션 설정.
  const dataOption = {
    title: bodydata.title,
    content: JSON.parse(bodydata.content),
    updatedAt: dbNow(),
  };

  return dataOption;
};
