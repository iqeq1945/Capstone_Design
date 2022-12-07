import multer from "multer";

export const storage = multer.diskStorage({
  // 2
  destination(req, file, cb) {
    cb(null, __dirname + "/../public/upload");
  },
  filename(req, file, cb) {
    console.log(req.body);
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
    cb(null, `${file.originalname}.${mimeType}`);
  },
});

export const upload = multer({ storage });
