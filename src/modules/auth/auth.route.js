import { Router } from "express";
import { authController } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.put("/:id", authController.createOrUpdateUser);
authRouter.get("/by-email", authController.findUserByEmail);
authRouter.get("/:id", authController.getUserById);
authRouter.post("/login", authController.login);
