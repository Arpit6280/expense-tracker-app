const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const User = require("./model/User");

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
      User.create({
        email: email,
        name: name,
        password: password,
      })
        .then((result) => {
          console.log(result);
          res.status(201).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(409).send("email already exists");
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
