const e = require("cors");
const sequelize = require("../database");
const Expense = require("../model/Expense");
const User = require("../model/User");

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

exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let { description, amount, category, date } = req.body;
    const user = await User.findByPk(req.user.id);
    user.totalAmount = parseInt(user.totalAmount) + parseInt(amount);
    await user.save({ transaction: t });

    let result = await req.user.createExpense(
      {
        description,
        amount,
        category,
        date,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json(result);
  } catch (err) {
    await t.rollback();
    console.log(e);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  const expenseId = req.params.expenseId;

  let amount;
  Expense.findAll(
    { where: { id: expenseId, userId: req.user.id } },
    { transaction: t }
  )
    .then((expense) => {
      amount = expense[0].amount;
      expense[0].destroy();
    })
    .then(() => {
      User.findByPk(req.user.id).then(async (user) => {
        user.totalAmount = parseInt(user.totalAmount) - parseInt(amount);
        await user.save({ transaction: t });
        await t.commit();
      });
    })
    .catch(async (e) => {
      await t.rollback();
      console.log(e);
    });
};
