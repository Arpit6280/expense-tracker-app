const sequelize = require("../database");
const Expense = require("../model/Expense");
const User = require("../model/User");

exports.showLeaderBoard = async (req, res, next) => {
  try {
    const leaderboardofusers = await User.findAll({
      attributes: ["id", "name", "totalAmount"],

      order: [[sequelize.col("totalAmount"), "DESC"]],
    });
    console.log(leaderboardofusers);

    res.status(200).json(leaderboardofusers);
  } catch (err) {
    console.log(err);
  }
};
