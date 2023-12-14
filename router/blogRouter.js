const router = require("express").Router();
const {
  isAdmin,
  authMiddleWare,
  isEditior,
} = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadImage");
const blogController = require("../controller/blogController");
router.post(
  "/create",
  authMiddleWare,
  isAdmin,
  upload.single("image"),
  blogController.createBlog
);
router.get("/posts", blogController.allBlog);
router.get("/:slug", blogController.blog);
router.post(
  "/:id",
  authMiddleWare,
  upload.single("image"),
  blogController.updateBlog
);

module.exports = router;
