const router = require("express").Router();
const {
  isAdmin,
  authMiddleWare,
  isEditior,
} = require("../middleware/authMiddleware");
const subCategoryController = require("../controller/subCategoryController");

router.post(
  "/create",
  authMiddleWare,
  isAdmin,
  subCategoryController.createSubCategory
);
router.get("/list", subCategoryController.subcategories);
router.get("/:id", subCategoryController.subCategory);
router.post("/:id", subCategoryController.updateSubCategory);

module.exports = router;
