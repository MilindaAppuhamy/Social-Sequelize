const { db, DataTypes } = require("../db/connection");

const Comment = db.define(
  "Comment",
  {
    body: DataTypes.STRING,
    createdAt: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Comment;
