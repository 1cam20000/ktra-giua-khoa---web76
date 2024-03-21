import { userModel } from "../models/user.model.js";

//api dki user
const createUser = async (body) => {
  const { email, name, birth, address, nation, password } = body;
  const user = userModel.create({
    email,
    name,
    birth,
    address,
    nation,
    password,
  });
  return user;
};

//api get all user
const allUsers = async () => {
  const users = await userModel.find().lean();
  return users;
};

//api update user
const updateUser = async (id, body) => {
  const { name, birth, address, nation, password } = body;
  const user = await userModel.findByIdAndUpdate(id, {
    name,
    birth,
    address,
    nation,
    password,
  });
  return user;
};

//api delete user
const deleteUser = async (userId, callback) => {
  const index = userModel.findIndex((user) => user.id === parseInt(userId));
  if (index) {
    userModel.splice(index, 1);
    callback(null, { success: true });
  } else {
    callback("user not found", null);
  }
};

const findOneUser = async (query) => {
  const user = await userModel.findOne(query);
  return user;
};

export { allUsers, createUser, deleteUser, updateUser, findOneUser };
