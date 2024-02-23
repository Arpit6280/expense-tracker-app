const Sequelize = require("sequelize");

const sequelize = require("../database");

const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.TEXT,
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = User;
