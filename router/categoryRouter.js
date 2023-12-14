const router = require("express").Router();
const {
  isAdmin,
  authMiddleWare,
  isEditior,
} = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadImage");
const categoryController = require("../controller/categoryController");
router.post(
  "/create",
  authMiddleWare,
  isAdmin,
  upload.single("image"),
  categoryController.createCategory
);
router.get("/all", authMiddleWare, categoryController.getCategoryList);
router.get("/:id", authMiddleWare, categoryController.getCategoryById);
router.post(
  "/:id",
  authMiddleWare,
  upload.single("image"),
  categoryController.updateCategory
);
module.exports = router;
