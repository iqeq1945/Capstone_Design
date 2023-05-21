import { check } from "express-validator";
import validationFunction from "./validationFunction";

export const CreateRequestValid = async (req, res, next) => {
  await check("authorId")
    .notEmpty()
    .withMessage("authorId가 존재하지 않습니다.")
    .bail()
    .isNumeric()
    .withMessage("authorId에는 숫자가 들어와야 합니다.")
    .run(req);
  await check("novelId")
    .notEmpty()
    .withMessage("novelId가 존재하지 않습니다.")
    .bail()
    .isNumeric()
    .withMessage("novelId에는 숫자가 들어와야 합니다.")
    .run(req);
  await check("title")
    .exists()
    .withMessage("title가 존재하지 않습니다")
    .isString()
    .withMessage("title은 String 형식에 맞게 들어와야 합니다.")
    .run(req);
  await check("content")
    .exists()
    .withMessage("content가 존재하지 않습니다")
    .isString()
    .withMessage("content 은 String 형식에 맞게 들어와야 합니다.")
    .run(req);
  await check("cycle")
    .exists()
    .withMessage("cycle가 존재하지 않습니다")
    .isString()
    .withMessage("cycle 은 String 형식에 맞게 들어와야 합니다.")
    .run(req);
  await check("category")
    .exists()
    .withMessage("category가 존재하지 않습니다")
    .isString()
    .withMessage("category은 String 형식에 맞게 들어와야 합니다.")
    .run(req);
  await check("image")
    .exists()
    .withMessage("image가 존재하지 않습니다")
    .isString()
    .withMessage("image은 String 형식에 맞게 들어와야 합니다.")
    .run(req);
  validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
  await check("novelId")
    .notEmpty()
    .withMessage("novelId가 존재하지 않습니다.")
    .bail()
    .isNumeric()
    .withMessage("novelId에는 숫자가 들어와야 합니다.")
    .run(req);
  CreateRequestValid(req, res, next);
};
