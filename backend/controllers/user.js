const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUpUser = (req, res, next) => {
  let { name, email, password } = req.body;
  console.log(req.body);
  console.log(name, email, password);
  User.findAll({ where: { email: email } }).then((users) => {
    console.log("888", users);
    if (users.length == 0) {
      const saltrounds = 10;
      bcrypt.hash(password, saltrounds, async (err, hash) => {
        User.create({
          email: email,
          name: name,
          password: hash,
          totalAmount: 0,
          ispremiumuser: false,
        })
          .then((result) => {
            console.log(result);
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      res.status(409).send("email already exists");
    }
  });
};

function generateAccessToken(id) {
  return jwt.sign(
    { userId: id },
    "98789cedf2f9a86af5391e93efgtuh657bgdnasxz4562iolkmhd"
  );
}

exports.loginUser = (req, res, next) => {
  let { email, password } = req.body;
  console.log(email, password);
  User.findAll({ where: { email: email } }).then((users) => {
    if (users.length == 0) {
      res.status(404).send("User not found");
    } else {
      console.log("***", users[0].email);
      // users enter password, // db users password, callback function
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (err) {
          res.status(500).json({ success: false, message: "Something wrong" });
        }
        if (result === true) {
          res.status(200).json({
            message: "User logged in successfully",
            token: generateAccessToken(users[0].id),
          });
        } else res.status(404).send("Password incorrect");
      });
    }
  });
};

exports.isPremium = (req, res, next) => {
  User.findByPk(req.user.id)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
