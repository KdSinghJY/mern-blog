const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageFileFilter = function (req, file, cb) {
  // Check if the file has an image extension
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(
      new Error("Please upload an image file (jpg, jpeg, png, gif)!"),
      false
    );
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter });
module.exports = { upload };
