import { User } from "./users.model.js";
import Post from "./posts.model.js";
import Comment from "./comments.model.js";

User.hasMany(Post, {
  foreignKey: "userId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});
