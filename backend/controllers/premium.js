const sequelize = require("../database");
const Expense = require("../model/Expense");
const User = require("../model/User");

exports.showLeaderBoard = async (req, res, next) => {
  try {
    const leaderboardofusers = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("expenses.amount")), "total"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [[sequelize.col("total"), "DESC"]],
    });

    res.status(200).json(leaderboardofusers);
  } catch (err) {
    console.log(err);
  }
};
