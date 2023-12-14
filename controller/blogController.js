const Blog = require("../modals/blogModal");

module.exports = {
  createBlog: async (req, res) => {
    const { title, slug, excerpt, body, category, subcategory } = req.body;
    const image = req.file;

    try {
      const blog = await Blog.create({
        title: title,
        slug: slug,
        excerpt: excerpt,
        body: body,
        category: category,
        subcategory: subcategory,
        imgUrl: process.env.BASE_URL + image.filename,
      });

      res.status(200).json({
        blog,
        message: "ctaegory create successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "somthing went wrong",
        error,
        success: true,
      });
    }
  },
  allBlog: async (req, res) => {
    var { page, pageSize, category, subcategory, keywords } = req.query;

    const skip = (page - 1) * pageSize;
    //console.log("request query", { page, pageSize, category, subcategory });

    category = category ? category.toString() : null;

    subcategory = subcategory ? subcategory.toString() : null;

    const buildBlogQuery = (category, subcategory, keywords) => {
      const query = {};

      if (category) {
        query.category = category;
      }

      if (subcategory) {
        query.subcategory = subcategory;
      }

      if (keywords) {
        query.title = { $regex: ".*" + keywords + ".*" };
      }

      return query;
    };

    const blogQuery = buildBlogQuery(category, subcategory, keywords);

    try {
      const blog = await Blog.find(blogQuery)
        .populate("category")
        .populate("subcategory")
        .skip(skip)
        .limit(pageSize)
        .exec();
      res.status(200).json({
        data: blog,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "somthing went wrong",
        error,
        success: true,
      });
    }
  },
  blog: async (req, res) => {
    const { slug } = req.params;
    try {
      const blog = await Blog.findOne({ slug }).populate([
        "category",
        "subcategory",
      ]);
      res.status(200).json({
        data: blog,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "somthing went wrong",
        error,
        success: true,
      });
    }
  },
  updateBlog: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { title, slug, excerpt, body, category, subcategory } = req.body;
    const image = req.file;
    console.log("req", req.body);
    // console.log("fhgj", { title, slug, excerpt, body, category, subcategory });
    try {
      const updatedBlog = await Blog.findById(id);
      updatedBlog.title = title;
      updatedBlog.slug = slug;
      updatedBlog.excerpt = excerpt;
      updatedBlog.body = body;
      updatedBlog.category = category;
      updatedBlog.subcategory = subcategory;
      if (image) {
        updatedBlog.imgUrl = process.env.BASE_URL + image.filename;
      }
      await updatedBlog.save();
      res.status(200).json({
        updatedBlog,
        message: "ctaegory updated successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "somthing went wrong",
        error,
        success: true,
      });
    }
  },
};
