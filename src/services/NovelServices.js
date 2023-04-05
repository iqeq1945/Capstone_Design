import * as NovelRepository from "../repositories/NovelRepository";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";

export const CreateNovel = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.title) {
      res.data = resFormat.fail(403, "제목이 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.body.cycle) {
      res.data = resFormat.fail(403, "연재 주기가 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.body.category) {
      res.data = resFormat.fail(403, "장르가 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.user) {
      res.data = resFormat.fail(403, "작가의 정보가 존재하지 않습니다.");
      return res.render("novels/new", { errors: res.data.message });
    }
    console.log(req.file);
    const data = createOption(req.body, req.file, req.user.id);
    const response = await NovelRepository.createNovel(data);
    if (response) {
      return res.redirect("/users/work");
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
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.body.cycle) {
      res.data = resFormat.fail(403, "연재 주기가 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.body.category) {
      res.data = resFormat.fail(403, "장르가 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.body.content) {
      res.data = resFormat.fail(403, "내용이 입력되지 않았습니다.");
      return res.render("novels/new", { errors: res.data.message });
    } else if (!req.user) {
      res.data = resFormat.fail(403, "작가의 정보가 존재하지 않습니다.");
      return res.render("novels/new", { errors: res.data.message });
    }

    let data = updateOption(req.body);
    const response = await NovelRepository.updateNovel(data, req.body.novelId);
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
    const check = await NovelRepository.findById(
      parseInt(req.params.novelId, 10)
    );
    if (check && req.user.id == check.authorId) {
      const response = await NovelRepository.deleteNovel(
        parseInt(req.params.novelId, 10)
      );
      if (response) {
        return res.render("/user/work");
      } else {
        return res.send("삭제 실패");
      }
    } else {
      return res.send("query정보 오류");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Search = async (req, res, next) => {
  try {
    req.body.keyword = req.body.keyword == "" ? undefined : req.body.keyword;
    const response = await NovelRepository.findByKeyword(req.body.keyword);
    if (response) {
      res.render("novels/category", { data: response });
    } else {
      return res.redirect("검색 실패");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const GetList = async (req, res, next) => {
  try {
    req.params.category =
      req.params.category != ("전체" || none) ? req.params.category : undefined;
    const response = await NovelRepository.findList(req.params.category);
    if (response) {
      res.render("novels/category", { data: response });
    } else {
      return res.redirect("검색 실패");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const GetMyList = async (req, res, next) => {
  try {
    const response = await NovelRepository.findByauthor(req.user.id);
    if (response) {
      res.render("user/work", { user: req.user, data: response });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const GetInfo = async (req, res, next) => {
  try {
    const response = await NovelRepository.findById(
      parseInt(req.params.id, 10)
    );
    if (response) {
      res.render("novels/update", { data: response });
    } else {
      return res.redirect("/users/work");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

const createOption = (bodydata, file, authorId) => {
  // DB data 옵션 설정.
  const dataOption = {
    title: bodydata.title,
    content: bodydata.content,
    category: bodydata.category,
    cycle: bodydata.cycle.toString(),
    image: file.location,
    author: {
      connect: { id: authorId },
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
    content: bodydata.content,
    category: bodydata.category,
    cycle: bodydata.cycle.toString(),
    updatedAt: dbNow(),

  };

  return dataOption;
};
