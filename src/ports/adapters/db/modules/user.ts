import { CreateUserType, UpdateUserType } from "@/core/user/types";
import { database as db } from "../db";
import { DeleteUserType, FindAllUserType, FindByIdUserType } from "../types";

export const registerUserInDB = async (input: CreateUserType) => {
  const result = await db.registerUser(input);
  return result;
};

export const findUserById = async (input: FindByIdUserType) => {
  const result = await db.findUserById(input);
  return result;
};

export const findAllUsers = async (input: FindAllUserType) => {
  const result = await db.findAllUsers(input);
  return result;
};

export const updateUserInDB = async (input: UpdateUserType) => {
  const result = await db.updateUser(input);
  return result;
};

export const deleteUserInDB = async (input: DeleteUserType) => {
  const result = await db.deleteUserInDB(input);
  return result;
};
