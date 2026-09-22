import { commentService } from "./comment.service.js";

async function createBulkOfComments(req, res, next) {
  try {
    const { comments } = req.body;
    await commentService.createBulkOfComments(comments);

    res.status(201).json({
      message: "comments created",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function editComment(req, res, next) {
  try {
    const { userId, content } = req.body;
    const commentId = req.params.commentId;

    await commentService.editComment(commentId, userId, content);

    res.json({
      message: "comment updated",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function findOrCreateComment(req, res, next) {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await commentService.findOrCreateComment(
      postId,
      userId,
      content,
    );

    res.json({
      comment,
      created,
    });
  } catch (err) {
    next(err);
  }
}

async function findAndCountCommentWithSpecificWord(req, res, next) {
  try {
    const word = req.query.word;

    const { count, rows } =
      await commentService.findAndCountCommentWithSpecificWord(word);

    res.json({
      count,
      comments: rows,
    });
  } catch (err) {
    next(err);
  }
}

async function getRecentComments(req, res, next) {
  try {
    const postId = req.params.postId;

    const recentComments = await commentService.getRecentComments(postId);

    res.json(recentComments);
  } catch (err) {
    next(err);
  }
}

async function getCommentByPK(req, res, next) {
  try {
    const commentId = req.params.commentId;

    const comment = await commentService.getCommentByPK(commentId);

    res.json(comment);
  } catch (err) {
    next(err);
  }
}

export const commentController = {
  createBulkOfComments,
  editComment,
  findOrCreateComment,
  findAndCountCommentWithSpecificWord,
  getRecentComments,
  getCommentByPK,
};
