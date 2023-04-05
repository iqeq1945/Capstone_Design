const AWS = require("aws-sdk");

var multer = require("multer");
var multerS3 = require("multer-s3");

const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

const bucket = "jandybucket";

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const s3 = new AWS.S3();

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".gif"];

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
    acl: "public-read",
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callbackify(new Error("wrong extension"));
      }
      cb(
        null,
        `${Math.random().toString(36).substring(2, 12)}_${file.originalname}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
