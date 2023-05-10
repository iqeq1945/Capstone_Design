import * as UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import passport from "passport";
import resFormat from "../utils/resFormat";

export const SingUp = async (req, res, next) => {
  try {
    //name, email, password
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.passwordConfirmation
    ) {
      res.data = resFormat.fail(403, "입력되지 않은 정보가 있습니다.");
      return res.render("user/signup", { errors: res.data.message });
    }
    const exUserName = await UserRepository.findByName(req.body.name);
    if (exUserName) {
      res.data = resFormat.fail(403, "이미 가입된 닉네임입니다.");
      return res.render("user/signup", { errors: res.data.message });
    }
    const exUserEmail = await UserRepository.findByEmail(req.body.email);
    if (exUserEmail) {
      res.data = resFormat.fail(403, "이미 가입된 이메일입니다.");
      return res.render("user/signup", { errors: res.data.message });
    }
    if (req.body.password != req.body.passwordConfirmation) {
      res.data = resFormat.fail(403, "비밀번호를 다시확인하세요.");
      return res.render("user/signup", { errors: res.data.message });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const response = await UserRepository.create(
      req.body.name,
      req.body.email,
      hashPassword
    );
    if (response) {
      passport.authenticate("local", (err, user, info) => {
        if (!user) {
          return res.status(401).send(resFormat.fail(401, info.message));
        }
        req.login(user, (err) => {
          if (err) {
            console.error(err);
            next(err);
          }
          res.data = resFormat.successData(
            200,
            "회원가입 및 로그인 성공",
            user
          );
          res.redirect("/");
          return;
        });
      })(req, res, next);
    } else {
      res.data = resFormat.fail(500, "회원가입 실패");
      res.redirect("/users/signup");
      return;
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("user/login", {
        email: req.body.email,
        errors: info.message,
      });
    }
    req.login(user, (err) => {
      if (err) {
        //passport login 실행단계
        console.error(err);
        next(err);
      }
      res.data = resFormat.success(200, "로그인 성공");
      return res.redirect("/");
    });
  })(req, res, next);
};

export const LogOut = (req, res, next) => {
  req.logOut();
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      res.clearCookie("connect.sid");
      res.data = resFormat.success(200, "로그아웃 성공");
      res.redirect("/");
    }
  });
};

export const CreateSeed = async (req, res, next) => {
  try {
    const response = await UserRepository.createSeed(
      req.user.id,
      parseInt(req.body.seed, 10) / 100
    );
    if (response) {
      next();
    } else {
      return res.redirect("/users/cash");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const DeleteSeed = async (req, res, next) => {
  try {
    const response = await UserRepository.deleteSeed(req.user.id);
    if (response) {
      next();
    } else {
      return res.redirect("/novels/" + parseInt(req.body.novelId, 10));
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const LikeOnNovel = async (req, res, next) => {
  try {
    const response = await UserRepository.LikeOnNovel(
      req.user.id,
      parseInt(req.body.novelId, 10)
    );
    if (response) {
      next();
    } else {
      res.send("좋아요 실패");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const unLikeOnNovel = async (req, res, next) => {
  try {
    const response = await UserRepository.unLikeOnNovel(
      req.user.id,
      parseInt(req.body.novelId, 10)
    );
    if (response) {
      next();
    } else {
      res.send("좋아요 실패");
    }
  } catch (err) {
    console.error(err);
    next();
  }
};
