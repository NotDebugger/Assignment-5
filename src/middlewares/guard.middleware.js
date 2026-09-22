import jwt from "jsonwebtoken";
import { authRepository } from "../modules/auth/auth.repository.js";

export async function guard(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("authorization is missing");

    const token = auth.split(" ")[1];
    if (!token) throw new Error("token is missing");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const userExist = await authRepository.findUserById(payload.id);
    if (!userExist) throw new Error("no user found");
    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
}
