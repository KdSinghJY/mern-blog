const express = require("express");
const dbConnect = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config({
  path: "./config/config.env",
});
const userRouter = require("./router/userRouter");
const categoryRouter = require("./router/categoryRouter");
const blogRouter = require("./router/blogRouter");
const subCategoryRouter = require("./router/subCategoryRouter");
dbConnect();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use("/api", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/post", blogRouter);
app.use("/api/subcategory", subCategoryRouter);
app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`server is started ${process.env.PORT}`);
  }
});
