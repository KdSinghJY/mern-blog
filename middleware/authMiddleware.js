const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const authMiddleWare = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      const { email } = user;
      const authUser = await User.findOne({ email: email });
      req.user = authUser;

      next();
    }
  } else {
    res.status(401).json({ message: "you are not authenticated" });
  }
};
const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role.includes("admin")) {
    next();
  } else {
    res.status(401).json({ message: "you are not authorized" });
  }
};

const isEditior = async (req, res, next) => {
  const { role } = req.user;
  if (role.includes("editior")) {
    next();
  } else {
    res.status(401).json({ message: "you are not authorized" });
  }
};
module.exports = { authMiddleWare, isAdmin, isEditior };
