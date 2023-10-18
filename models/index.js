const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const Profile = require("./Profile");
const User = require("./User");

//relationships
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.belongsToMany(Like, { through: "user_likes" });
Like.belongsToMany(User, { through: "user_likes" });

module.exports = {
  Comment,
  Like,
  Post,
  Profile,
  User,
};
