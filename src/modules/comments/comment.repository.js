import { Op } from "sequelize";
import Comment from "../../common/models/comments.model.js";
import { User } from "../../common/models/users.model.js";
import Post from "../../common/models/posts.model.js";

async function createBulkOfComments(comments) {
  return await Comment.bulkCreate(comments, { validate: true });
}

async function findCommentById(id) {
  return await Comment.findByPk(id);
}

async function updateCommentById(comment, content) {
  return await comment.update({ content });
}

async function findOrCreateComment(postId, userId, content) {
  return await Comment.findOrCreate({ where: { postId, userId, content } });
}

async function findAndCountCommentWithSpecificWord(word) {
  return await Comment.findAndCountAll({
    where: {
      content: { [Op.like]: `%${word}%` },
    },
  });
}

async function getRecentComments(postId) {
  return await Comment.findAll({
    where: {
      postId,
    },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
}

async function getCommentByPK(commentId) {
  return await Comment.findByPk(commentId, {
    attributes: ["id", "content"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      },
    ],
  });
}

export const commentRepository = {
  createBulkOfComments,
  findCommentById,
  updateCommentById,
  findOrCreateComment,
  findAndCountCommentWithSpecificWord,
  getRecentComments,
  getCommentByPK,
};
