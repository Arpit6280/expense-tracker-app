const e = require("cors");
const sequelize = require("../database");
const Expense = require("../model/Expense");
const User = require("../model/User");
const { Op } = require("sequelize");

exports.getExpenses = (req, res, next) => {
  // req.user.getExpenses()
  let page = Number(req.query.pages);

  let ITEMS_PER_PAGE = 2;
  let totalExpenses;
  console.log("page", page);
  Expense.count()
    .then((total) => {
      console.log("total", total);
      totalExpenses = total;
      return Expense.findAll({
        where: { userId: req.user.id },
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
      });
    })
    .then((expenses) => {
      console.log("eeeee", expenses);
      let obj = {
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalExpenses,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(totalExpenses / ITEMS_PER_PAGE),
        nextPage: Number(page) + 1,
        previousPage: page - 1,
      };
      res.status(200).json({ expenses, pageData: obj });
    })
    .catch((err) => {
      console.log("errrrr", err);
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
