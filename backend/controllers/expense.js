const Expense = require("../model/Expense");

exports.getExpenses = (req, res, next) => {
  // req.user.getExpenses()
  Expense.findAll({ where: { userId: req.user.id } })
    .then((expenses) => {
      console.log("eeeee", expenses);
      res.status(200).json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addExpense = (req, res, next) => {
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
};

exports.deleteExpense = (req, res, next) => {
  const expenseId = req.params.expenseId;
  Expense.findAll({ where: { id: expenseId, userId: req.user.id } })
    .then((expense) => expense[0].destroy())
    .catch((e) => {
      console.log(e);
    });
};
