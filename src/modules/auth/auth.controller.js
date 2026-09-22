import { authService } from "./auth.service.js";

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    await authService.signup(name, email, password);

    res.status(201).json({
      message: "user created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function createOrUpdateUser(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    await authService.createOrUpdateUser(data, id);

    res.json({
      message: "user created or updated successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function findUserByEmail(req, res, next) {
  try {
    const email = req.query.email;
    const user = await authService.findUserByEmail(email);

    res.json({
      message: "user created or updated successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const id = req.params.id;
    const user = await authService.findUserById(id);

    res.json({
      message: "user created or updated successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.json({
      message: "logged in successfully",
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
}

export const authController = {
  signup,
  createOrUpdateUser,
  findUserByEmail,
  getUserById,
  login,
};
