import * as NovelRepository from "../repositories/NovelRepository";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";

export const CreateNovel = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.body.cycle) {
      res.data = resFormat.fail(403, "연재 주기가 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.body.category) {
      res.data = resFormat.fail(403, "장르가 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.user) {
      res.data = resFormat.fail(403, "작가의 정보가 존재하지 않습니다.");
      return res.render("novel/new", { errors: res.data.message });
    }

    let data = req.body;
    data.cycle = data.cycle.toString();
    data.createdAt = dbNow();
    data.authorId = parseInt(req.user.id, 10);

    const response = await NovelRepository.createNovel(data);
    if (response) {
      return res.render("novels/index", { data });
    } else {
      return res.redirect("/novels");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdateNovel = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.body.cycle) {
      res.data = resFormat.fail(403, "연재 주기가 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.body.category) {
      res.data = resFormat.fail(403, "장르가 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.render("novel/new", { errors: res.data.message });
    } else if (!req.user) {
      res.data = resFormat.fail(403, "작가의 정보가 존재하지 않습니다.");
      return res.render("novel/new", { errors: res.data.message });
    }

    let data = req.body;
    data.cycle = data.cycle.toString();
    data.updatedAt = dbNow();
    data.authorId = parseInt(req.user.id, 10);

    const response = await NovelRepository.updateNovel(data);
    if (response) {
      return res.render("novels/index", { data });
    } else {
      return res.redirect("/novels");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const DeleteNovel = async (req, res, next) => {
  try {
    if (req.user.id != req.body.author) {
      return res.send("작가의 정보가 옳지 않음");
    }
    const response = await NovelRepository.deleteNovel(req.body.id);
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
