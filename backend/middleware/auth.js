const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(
      token,
      "98789cedf2f9a86af5391e93efgtuh657bgdnasxz4562iolkmhd"
    );
    console.log("userid>>>", user.userId);
    User.findByPk(user.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (e) {
    console.log(e);
    res.status(401).json({ sucess: false });
  }
};

module.exports = {
  authenticate,
};
