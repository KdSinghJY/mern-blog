const User = require("../modals/userModal.js");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    try {
      console.log(1);
      const user = await User.create({
        name: name,
        email: email,
        password: password,
        phone: phone,
      });
      console.log("sdfghjk", user);
      //   console.log(2);
      //   const res = await user.save();
      //   console.log("res", res);
      console.log(3);
      res
        .status(200)
        .json({ message: "user created successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "network problem", error });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "credentials not matched", success: false });
    }
    const isPasswordMatched = await user.validatePassword(password);
    if (!isPasswordMatched) {
      return res
        .status(404)
        .json({ message: "credentials not matched", success: false });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 5 * 60 * 60,
    });

    res
      .status(202)
      .json({ token, message: "loggin successfully", success: true });
    try {
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "network problem", error });
    }
  },
  //   logout: async (reg, res) => {
  //     try {
  //     } catch (error) {}
  //   },
};
