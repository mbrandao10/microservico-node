import { 
  CreateCompanieType,
  UpdateCompanieType
} from "@/core/companie/types";
import { database as db } from "../db";
import { 
  DeleteCompanieType,
  FindByIdCompanieType,
  FindAllCompanieType
} from "../types";

export const registerCompanieInDB = async (input: CreateCompanieType) => {
  const result = await db.registerCompanie(input);
  return result;
};

export const findCompanieById = async (input: FindByIdCompanieType) => {
  const result = await db.findCompanieById(input);
  return result;
};

export const findAllCompanies = async (input: FindAllCompanieType) => {
  const result = await db.findAllCompanies(input);
  return result;
};

export const updateCompanieInDB = async (input: UpdateCompanieType) => {
  const result = await db.updateCompanie(input);
  return result;
};

export const deleteCompanieInDB = async (input: DeleteCompanieType) => {
  const result = await db.deleteCompanieInDB(input);
  return result;
};
