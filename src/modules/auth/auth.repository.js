import { User } from "../../common/models/users.model.js";

async function findUserByEmail(email) {
  return await User.findOne({
    where: {
      email,
    },
    // attributes: {
    //   exclude: ["password"],
    // },
  });
}

async function findUserById(id) {
  return await User.findByPk(id, {
    attributes: {
      exclude: ["role", "password"],
    },
  });
}

async function updateUser(user, data) {
  return await user.update(data, { validate: false });
}

async function createUser(name, email, passwordHash) {
  const user = User.build({ name, email, password: passwordHash });
  return await user.save();
}

async function createUserById(data, id) {
  return await User.create({ id, ...data }, { validate: false });
}

export const authRepository = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  createUserById,
};
