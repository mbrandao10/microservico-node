import { CreateCompanieType, UpdateCompanieType } from "@/core/companie/types";
import * as dbAdpter from "@/ports/adapters/db";
import * as companie from "@/core/companie/use-cases";

export const registerCompanie = async (input: CreateCompanieType) => {
  const result = await companie.registerCompanie(dbAdpter.registerCompanieInDB)(input);
  return result;
};

export const findCompanieById = async (data: dbAdpter.FindByIdCompanieType) => {
  const result = await dbAdpter.findCompanieById(data);
  return result;
};

export const findAllCompanies = async (data: dbAdpter.FindAllCompanieType) => {
  const result = await dbAdpter.findAllCompanies(data);
  return result;
};

export const updateCompanie = async (data: UpdateCompanieType) => {
  const result = await companie.updateCompanie(dbAdpter.updateCompanieInDB)(data);
  return result;
};

export const deleteCompanie = async (data: dbAdpter.DeleteCompanieType) => {
  const result = await dbAdpter.deleteCompanieInDB(data);
  return result;
};

