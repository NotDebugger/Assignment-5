import { postService } from "./post.service.js";

async function createPost(req, res, next) {
  try {
    const { title, content } = req.body;
    const user = req.user;
    await postService.createPost(title, content, user.id);

    res.status(201).json({
      message: "post created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function deletePostById(req, res, next) {
  try {
    const postId = req.params.id;
    await postService.deletePostById(postId);

    res.json({
      message: "post deleted successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function getAllPostsWithDetails(req, res, next) {
  try {
    const data = await postService.getAllPostsWithDetails();

    res.json({
      message: "posts retrieved successfully",
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function getAllPostsAndCountComments(req, res, next) {
  try {
    const data = await postService.getAllPostsAndCountComments();

    res.json({
      message: "posts retrieved successfully",
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

export const postController = {
  createPost,
  deletePostById,
  getAllPostsWithDetails,
  getAllPostsAndCountComments,
};
