import "dotenv/config";
import express from "express";
import "./common/models/index.js";
import { bootstrapDB } from "./common/db/db.connection.js";
import { authRouter } from "./modules/auth/auth.route.js";
import { postRouter } from "./modules/post/post.route.js";
import { commentRouter } from "./modules/comments/comment.route.js";

const app = express();

app.use(express.json());
app.use("/users", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    success: false,
    stack: error.stack,
  });
});

const bootstrap = async () => {
  await bootstrapDB();
};

bootstrap();

app.listen(3000, () => {
  console.log("server is running");
});
