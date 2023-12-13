const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = { auth };
