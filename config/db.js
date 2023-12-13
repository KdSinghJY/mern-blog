const mongoose = require("mongoose");

const dbConnect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  if (conn) {
    console.log("database connected");
  }
};

module.exports = dbConnect;
