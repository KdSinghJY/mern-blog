const subCategory = require("../modals/subCategoryModal");
const Category = require("../modals/categoryModal");

module.exports = {
  createSubCategory: async (req, res) => {
    const { name, slug, exert, category } = req.body;
    console.log({ name, slug, exert, category });
    try {
      const subcategory = await subCategory.create({
        name,
        slug,
        exert,
        category,
      });

      await Category.findByIdAndUpdate(
        subcategory.category,
        { $push: { subcategories: subcategory._id } },
        { new: true }
      );
      res.status(202).json({
        subcategory,
        message: "sub category created",
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Something went wrong", success: false });
    }
  },
  subcategories: async (req, res) => {
    try {
      const subcategories = await subCategory.find();
      res.status(200).json({
        dfata: subcategories,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Somthing went wrong",
        error,
        success: false,
      });
    }
  },
  updateSubCategory: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { name, slug, exert, category } = req.body;
    try {
      const subcategory = await subCategory.findById(id);
      console.log(subcategory);
      subcategory.name = name;
      subcategory.slug = slug;
      subcategory.exert = exert;
      subcategory.category = category;
      await subcategory.save();
      res.status(200).json({
        message: "subcategoris updated successsfully",
        success: true,
        subcategory,
      });
    } catch (error) {
      res.status(500).json({
        message: "somthing went wrong",
        success: false,
      });
    }
  },
  subCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await subCategory.findById(id);
      res.status(200).json({
        data: category,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "somthing went wrong",
        error,
        success: false,
      });
    }
  },
};
