import { check } from "express-validator";
import validationFunction from "./validationFunction";

export const CreateRequestValid = async (req, res, next) => {
  console.log(req.body);
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
    .custom((cycle) => {
      if (typeof cycle === "string" || Array.isArray(cycle)) return true;
      else false;
    })
    .withMessage("cycle 은 배열 형식에 맞게 들어와야 합니다.")
    .run(req);
  await check("category")
    .exists()
    .withMessage("category가 존재하지 않습니다")
    .isString()
    .withMessage("category은 String 형식에 맞게 들어와야 합니다.")
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
