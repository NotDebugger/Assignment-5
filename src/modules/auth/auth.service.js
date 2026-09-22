import { authRepository } from "./auth.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(name, email, password) {
  const userExist = await authRepository.findUserByEmail(email);
  if (userExist) throw new Error("User already exists.");

  const passwordHash = await bcrypt.hash(password, 10);

  return await authRepository.createUser(name, email, passwordHash);
}

async function createOrUpdateUser(data, id) {
  const userExist = await authRepository.findUserById(id);
  if (userExist) await authRepository.updateUser(userExist, data);

  await authRepository.createUserById(data, id);
}

async function findUserByEmail(email) {
  const userExist = await authRepository.findUserByEmail(email);
  if (!userExist) throw new Error("no user found");

  return userExist;
}

async function findUserById(id) {
  const userExist = await authRepository.findUserById(id);
  if (!userExist) throw new Error("no user found");

  return userExist;
}

async function login(email, password) {
  const userExist = await authRepository.findUserByEmail(email);
  if (!userExist) throw new Error("no user found");

  const compare = await bcrypt.compare(password, userExist.password);
  if (!compare) throw new Error("email or password is wrong");

  const token = jwt.sign(
    {
      id: userExist.id,
      name: userExist.name,
    },
    process.env.JWT_SECRET,
  );

  return token;
}

export const authService = {
  signup,
  createOrUpdateUser,
  findUserByEmail,
  findUserById,
  login,
};
