const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "expense-app",
  process.env.DB,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
