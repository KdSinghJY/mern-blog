const express = require("express");
const dbConnect = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config({
  path: "./config/config.env",
});
const userRouter = require("./router/userRouter");
dbConnect();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use("/api", userRouter);
app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`server is started ${process.env.PORT}`);
  }
});
