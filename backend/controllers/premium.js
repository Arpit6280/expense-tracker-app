const Expense = require("../model/Expense");
const User = require("../model/User");

exports.showLeaderBoard = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userAggregatedExpenses = {};
    expenses.forEach((expense) => {
      if (userAggregatedExpenses[expense.userId]) {
        userAggregatedExpenses[expense.userId] =
          userAggregatedExpenses[expense.userId] + expense.amount;
      } else {
        userAggregatedExpenses[expense.userId] = expense.amount;
        console.log(userAggregatedExpenses[expense.userId]);
      }
    });
    var userLeaderBoardDetails = [];
    users.forEach((user) => {
      userLeaderBoardDetails.push({
        name: user.name,
        total: userAggregatedExpenses[user.id] || 0,
      });
    });
    userLeaderBoardDetails.sort((a, b) => b.total - a.total);
    console.log(userLeaderBoardDetails);
    res.status(200).json(userLeaderBoardDetails);
  } catch (err) {
    console.log(err);
  }
};
