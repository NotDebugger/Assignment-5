import { commentRepository } from "./comment.repository.js";
import { authRepository } from "../auth/auth.repository.js";
import { postRepository } from "../post/post.repository.js";

async function createBulkOfComments(comments) {
  return await commentRepository.createBulkOfComments(comments);
}

async function editComment(commentId, userId, content) {
  const userExist = await authRepository.findUserById(userId);
  if (!userExist) throw new Error("no user found");

  const comment = await commentRepository.findCommentById(commentId);
  if (!comment) throw new Error("comment not found");

  if (comment.userId !== userId)
    throw new Error("you are not authorized to update this comment");

  return await commentRepository.updateCommentById(comment, content);
}

async function findOrCreateComment(postId, userId, content) {
  const userExist = await authRepository.findUserById(userId);
  if (!userExist) throw new Error("user not found");

  const post = await postRepository.findPostById(postId);
  if (!post) throw new Error("post not found");

  return await commentRepository.findOrCreateComment(postId, userId, content);
}

async function findAndCountCommentWithSpecificWord(word) {
  return await commentRepository.findAndCountCommentWithSpecificWord(word);
}

async function getRecentComments(postId) {
  return await commentRepository.getRecentComments(postId);
}

async function getCommentByPK(commentId) {
  return await commentRepository.getCommentByPK(commentId);
}

export const commentService = {
  createBulkOfComments,
  editComment,
  findOrCreateComment,
  findAndCountCommentWithSpecificWord,
  getRecentComments,
  getCommentByPK,
};
