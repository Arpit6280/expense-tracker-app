const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const userRoutes = require("./controllers/user");
const Expense = require("./model/Expense");
const { authenticate } = require("./middleware/auth");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post("/signup", userRoutes.signUpUser);

app.post("/login", userRoutes.loginUser);

app.post("/expense/addexpenses", authenticate, (req, res, next) => {
  let { description, amount, category, date } = req.body;
  // Expense.create({
  //   description,
  //   amount,
  //   category,
  //   date,
  // });
  req.user
    .createExpense({
      description,
      amount,
      category,
      date,
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/expense/getexpenses", authenticate, (req, res, next) => {
  // req.user.getExpenses()
  Expense.findAll({ where: { userId: req.user.id } })
    .then((expenses) => {
      console.log("eeeee", expenses);
      res.status(200).json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/expense/delete/:expenseId", authenticate, (req, res, next) => {
  const expenseId = req.params.expenseId;
  Expense.findAll({ where: { id: expenseId, userId: req.user.id } })
    .then((expense) => expense[0].destroy())
    .catch((e) => {
      console.log(e);
    });
});

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
