import { postRepository } from "./post.repository.js";

async function createPost(title, content, userId) {
  return await postRepository.createPost(title, content, userId);
}

async function deletePostById(postId) {
  const postExist = await postRepository.findPostById(postId);
  if (!postExist) throw new Error("post not found");

  return await postRepository.deletePostById(postExist);
}

async function getAllPostsWithDetails() {
  return await postRepository.getAllPostsWithDetails();
}

async function getAllPostsAndCountComments() {
  return await postRepository.getAllPostsAndCountComments();
}

export const postService = {
  createPost,
  deletePostById,
  getAllPostsWithDetails,
  getAllPostsAndCountComments,
};
