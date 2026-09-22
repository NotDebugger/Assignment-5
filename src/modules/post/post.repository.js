import Comment from "../../common/models/comments.model.js";
import Post from "../../common/models/posts.model.js";
import { User } from "../../common/models/users.model.js";
import { sequelize } from "../../common/db/db.connection.js";

async function createPost(title, content, userId) {
  const post = Post.build({ title, content, userId });
  return await post.save();
}

async function findPostById(id) {
  return await Post.findByPk(id);
}

async function deletePostById(post) {
  return await post.destroy();
}

async function getAllPostsWithDetails() {
  return await Post.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: User,
        attributes: ["id", "name"],
      },
      {
        model: Comment,
        attributes: ["id", "content"],
      },
    ],
  });
}

async function getAllPostsAndCountComments() {
  return await Post.findAll({
    attributes: [
      "id",
      "title",
      [sequelize.fn("COUNT", sequelize.col("Comments.id")), "commentsCount"],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
      },
    ],
    group: ["Post.id"],
  });
}

export const postRepository = {
  createPost,
  findPostById,
  deletePostById,
  getAllPostsWithDetails,
  getAllPostsAndCountComments,
};
