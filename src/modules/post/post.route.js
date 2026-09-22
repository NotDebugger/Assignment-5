import { Router } from "express";
import { postController } from "./post.controller.js";
import { guard } from "../../middlewares/guard.middleware.js";

export const postRouter = Router();

postRouter.post("/", guard, postController.createPost);
postRouter.delete("/:id", guard, postController.deletePostById);
postRouter.get("/details", postController.getAllPostsWithDetails);
postRouter.get("/comment-count", postController.getAllPostsAndCountComments);
