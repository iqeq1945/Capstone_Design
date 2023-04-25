import multer from "multer";
import { StringToDate } from "../utils/dayUtils";
export const storage = multer.diskStorage({
  // 2
  destination(req, file, cb) {
    cb(null, __dirname + "/../public/upload");
  },
  filename(req, file, cb) {
    let mimeType;
    switch (file.mimetype) {
      case "image/jpeg":
        mimeType = "jpg";
        break;
      case "image/png":
        mimeType = "png";
        break;
      case "image/gif":
        mimeType = "gif";
        break;
      case "image/bmp":
        mimeType = "bmp";
        break;
      default:
        mimeType = "jpg";
        break;
    }
    cb(
      null,
      `${req.user.id}_${Math.random()
        .toString(36)
        .substring(2, 12)}.${mimeType}`
    );
  },
});

export const postStorage = multer.diskStorage({
  // 2
  destination(req, file, cb) {
    cb(null, __dirname + "/../public/upload");
  },
  filename(req, file, cb) {
    console.log(file);
    let mimeType;
    switch (file.mimetype) {
      case "image/jpeg":
        mimeType = "jpg";
        break;
      case "image/png":
        mimeType = "png";
        break;
      case "image/gif":
        mimeType = "gif";
        break;
      case "image/bmp":
        mimeType = "bmp";
        break;
      default:
        mimeType = "jpg";
        break;
    }
    cb(null, `${req.user.id}${req.body.title}.${mimeType}`);
  },
});

export const upload = multer({ storage });
export const postUpload = multer({ postStorage });
