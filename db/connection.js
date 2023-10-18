const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db.aqlite",
});

module.exports = {
  db,
  DataTypes,
};
