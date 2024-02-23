const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const User = require("./model/User");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post("/signup", (req, res, next) => {
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
});

app.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  console.log(email, password);
  User.findAll({ where: { email: email } }).then((users) => {
    if (users.length == 0) {
      res.status(404).send("User not found");
    } else {
      console.log("***", users[0].email);
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (err) {
          res.status(500).json({ success: false, message: "Something wrong" });
        }
        if (result === true) {
          res.status(200).json("User logged in successfully");
        } else res.status(404).send("Password incorrect");
      });
    }
  });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
