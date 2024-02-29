const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const userRoutes = require("./controllers/user");
const purchaseRoutes = require("./controllers/purchase");
const expenseRoutes = require("./controllers/expense");
const Expense = require("./model/Expense");
const { authenticate } = require("./middleware/auth");
const Order = require("./model/Order");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post("/signup", userRoutes.signUpUser);

app.post("/login", userRoutes.loginUser);

app.post("/expense/addexpenses", authenticate, expenseRoutes.addExpense);

app.get("/expense/getexpenses", authenticate, expenseRoutes.getExpenses);

app.delete(
  "/expense/delete/:expenseId",
  authenticate,
  expenseRoutes.deleteExpense
);

app.get(
  "/purchase/premiummember",
  authenticate,
  purchaseRoutes.purchasePremium
);

app.post(
  "/purchase/updatetransactionstatus",
  authenticate,
  purchaseRoutes.updateTransactionStatus
);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
