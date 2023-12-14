const Category = require("../modals/categoryModal");

module.exports = {
  createCategory: async (req, res) => {
    try {
      console.log("baseUrl", process.env.BASE_URL);
      const { name, slug, exert } = req.body;
      const image = req.file;
      const category = await Category.create({
        name: name,
        slug: slug,
        exert: exert,
        imgUrl: process.env.BASE_URL + image.filename,
      });

      res.status(200).json({
        category,
        message: "ctaegory create successfully",
        success: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getCategoryById: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
        error,
        success: false,
      });
    }
  },
  getCategoryList: async (req, res) => {
    try {
      const category = await Category.find().populate("subcategories");
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
        error,
        success: false,
      });
    }
  },
  updateCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const { name, slug, exert } = req.body;
      const image = req.file;
      const category = await Category.findById(id);

      category.name = name;
      category.slug = slug;
      category.exert = exert;
      if (image) {
        category.imgUrl = process.env.BASE_URL + image.filename;
      }
      await category.save();
      res.status(200).json({
        category,
        message: "ctaegory updated successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },
};
