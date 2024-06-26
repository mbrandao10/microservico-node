import { CreateUserType, UpdateUserType } from "@/core/user/types";
import * as dbAdpter from "@/ports/adapters/db";
import * as user from "@/core/user/use-cases";

export const registerUser = async (input: CreateUserType) => {
  const result = await user.registerUser(dbAdpter.registerUserInDB)(input);
  return result;
};

export const findUserById = async (data: dbAdpter.FindByIdUserType) => {
  const result = await dbAdpter.findUserById(data);
  return result;
};

export const findAllUsers = async (data: dbAdpter.FindAllUserType) => {
  const result = await dbAdpter.findAllUsers(data);
  return result;
};

export const updateUser = async (data: UpdateUserType) => {
  const result = await user.updateUser(dbAdpter.updateUserInDB)(data);
  return result;
};

export const deleteUser = async (data: dbAdpter.DeleteUserType) => {
  const result = await dbAdpter.deleteUserInDB(data);
  return result;
};

