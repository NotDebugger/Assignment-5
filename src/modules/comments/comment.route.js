import { Router } from "express";
import { commentController } from "./comment.controller.js";

export const commentRouter = Router();

commentRouter.post("/", commentController.createBulkOfComments);
commentRouter.patch("/:commentId", commentController.editComment);
commentRouter.post("/find-or-create", commentController.findOrCreateComment);
commentRouter.get(
  "/search",
  commentController.findAndCountCommentWithSpecificWord,
);
commentRouter.get("/newest/:postId", commentController.getRecentComments);
commentRouter.get("/details/:commentId", commentController.getCommentByPK);
